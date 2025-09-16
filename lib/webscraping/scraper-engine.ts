
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { Browser, Page } from 'playwright';
import { chromium } from 'playwright';

const prisma = new PrismaClient();

export interface ScrapingSource {
  id: string;
  name: string;
  url: string;
  type: 'noticias' | 'candidato_oficial' | 'partido_oficial' | 'redes_sociales' | 'gobierno';
  selectors: {
    container?: string;
    title?: string;
    content?: string;
    date?: string;
    author?: string;
    image?: string;
    link?: string;
  };
  frequency: number; // minutos
  active: boolean;
}

export class WebScrapingEngine {
  private browser: Browser | null = null;
  private sources: ScrapingSource[] = [];

  constructor() {
    this.initializeSources();
  }

  private initializeSources() {
    this.sources = [
      // Portales de noticias principales
      {
        id: 'el_comercio',
        name: 'El Comercio',
        url: 'https://elcomercio.pe/politica',
        type: 'noticias',
        selectors: {
          container: '.story-item',
          title: '.story-item__title',
          content: '.story-item__summary',
          date: '.story-item__date',
          link: '.story-item__link',
          image: '.story-item__img img'
        },
        frequency: 15,
        active: true
      },
      {
        id: 'rpp_noticias',
        name: 'RPP Noticias',
        url: 'https://rpp.pe/politica',
        type: 'noticias',
        selectors: {
          container: '.news-item',
          title: '.news-item__title',
          content: '.news-item__description',
          date: '.news-item__date',
          link: '.news-item__link',
          image: '.news-item__image img'
        },
        frequency: 15,
        active: true
      },
      {
        id: 'la_republica',
        name: 'La República',
        url: 'https://larepublica.pe/politica',
        type: 'noticias',
        selectors: {
          container: '.ArticleItem',
          title: '.ArticleItem__title',
          content: '.ArticleItem__summary',
          date: '.ArticleItem__date',
          link: '.ArticleItem__link',
          image: '.ArticleItem__image img'
        },
        frequency: 20,
        active: true
      },
      {
        id: 'gestion',
        name: 'Gestión',
        url: 'https://gestion.pe/politica',
        type: 'noticias',
        selectors: {
          container: '.story-item',
          title: '.story-item__headline-title',
          content: '.story-item__summary',
          date: '.story-item__date',
          link: '.story-item__headline-link',
          image: '.story-item__image img'
        },
        frequency: 20,
        active: true
      },
      // Sitios gubernamentales
      {
        id: 'jne_comunicados',
        name: 'JNE - Comunicados',
        url: 'https://www.jne.gob.pe/comunicados',
        type: 'gobierno',
        selectors: {
          container: '.comunicado-item',
          title: '.comunicado-title',
          content: '.comunicado-summary',
          date: '.comunicado-date',
          link: '.comunicado-link'
        },
        frequency: 60,
        active: true
      },
      {
        id: 'onpe_noticias',
        name: 'ONPE - Noticias',
        url: 'https://www.onpe.gob.pe/sala-prensa/noticias',
        type: 'gobierno',
        selectors: {
          container: '.noticia-item',
          title: '.noticia-title',
          content: '.noticia-resumen',
          date: '.noticia-fecha',
          link: '.noticia-link'
        },
        frequency: 60,
        active: true
      }
    ];
  }

  async initBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
  }

  async scrapeSource(source: ScrapingSource): Promise<any[]> {
    try {
      await this.initBrowser();
      if (!this.browser) throw new Error('Browser not initialized');

      const page = await this.browser.newPage();
      await page.goto(source.url, { waitUntil: 'networkidle' });

      // Esperar un poco para que la página cargue completamente
      await page.waitForTimeout(2000);

      const content = await page.content();
      const $ = cheerio.load(content);

      const items: any[] = [];

      // Buscar contenedores principales
      const containers = source.selectors.container ? 
        $(source.selectors.container) : 
        $('article, .news-item, .story-item, .noticia, .comunicado, .entry');

      containers.each((index, element) => {
        if (index >= 20) return false; // Limitar a 20 elementos por fuente

        const $element = $(element);
        
        // Extraer información
        const title = this.extractText($element, source.selectors.title, $);
        const content = this.extractText($element, source.selectors.content, $);
        const dateText = this.extractText($element, source.selectors.date, $);
        const link = this.extractLink($element, source.selectors.link, $, source.url);
        const image = this.extractImage($element, source.selectors.image, $, source.url);

        if (title && title.length > 10) {
          items.push({
            titulo: title,
            resumen: content || title,
            url: link,
            fuente: source.name,
            fechaPublicacion: this.parseDate(dateText),
            imagenUrl: image,
            tipo: source.type,
            sourceId: source.id
          });
        }
      });

      await page.close();
      return items;

    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
      return [];
    }
  }

  private extractText(element: any, selector: string | undefined, $: any): string {
    if (!selector) return '';
    
    const selectors = [
      selector,
      'h1, h2, h3, h4',
      '.title, .headline, .titulo',
      'a[href*="noticia"], a[href*="story"]'
    ];

    for (const sel of selectors) {
      const text = element.find(sel).first().text().trim();
      if (text && text.length > 5) return text;
    }

    return element.text().trim().substring(0, 200);
  }

  private extractLink(element: any, selector: string | undefined, $: any, baseUrl: string): string {
    if (!selector) {
      // Buscar enlaces automáticamente
      const link = element.find('a').first().attr('href') || 
                   element.find('[href]').first().attr('href') ||
                   element.attr('href');
      
      if (link) {
        return link.startsWith('http') ? link : new URL(link, baseUrl).href;
      }
      return '';
    }

    const link = element.find(selector).attr('href');
    if (link) {
      return link.startsWith('http') ? link : new URL(link, baseUrl).href;
    }
    return '';
  }

  private extractImage(element: any, selector: string | undefined, $: any, baseUrl: string): string {
    const selectors = [
      selector,
      'img',
      '[data-src]',
      '.image img, .foto img'
    ].filter(Boolean);

    for (const sel of selectors) {
      const imgSrc = element.find(sel).attr('src') || 
                     element.find(sel).attr('data-src') ||
                     element.find(sel).attr('data-original');
      
      if (imgSrc) {
        return imgSrc.startsWith('http') ? imgSrc : new URL(imgSrc, baseUrl).href;
      }
    }
    return '';
  }

  private parseDate(dateText: string): Date {
    if (!dateText) return new Date();

    // Diferentes formatos de fecha en español
    const patterns = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
      /(\d{1,2})-(\d{1,2})-(\d{4})/,
      /(\d{4})-(\d{1,2})-(\d{1,2})/,
    ];

    for (const pattern of patterns) {
      const match = dateText.match(pattern);
      if (match) {
        const [, day, month, year] = match;
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    }

    // Manejar fechas relativas en español
    const now = new Date();
    if (dateText.includes('hora') || dateText.includes('minuto')) {
      return now;
    }
    if (dateText.includes('ayer')) {
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    if (dateText.includes('hace') && dateText.includes('día')) {
      const days = parseInt(dateText.match(/\d+/)?.[0] || '1');
      return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    }

    return now;
  }

  async scrapeAll(): Promise<{ success: number; failed: number; total: number }> {
    const results = { success: 0, failed: 0, total: 0 };
    
    for (const source of this.sources.filter(s => s.active)) {
      try {
        results.total++;
        const items = await this.scrapeSource(source);
        
        // Guardar en base de datos
        for (const item of items) {
          try {
            await this.saveNewsItem(item);
            results.success++;
          } catch (error) {
            console.error(`Error saving item from ${source.name}:`, error);
            results.failed++;
          }
        }
      } catch (error) {
        console.error(`Error processing source ${source.name}:`, error);
        results.failed++;
      }
    }

    return results;
  }

  private async saveNewsItem(item: any): Promise<void> {
    try {
      // Verificar si ya existe
      const existing = await prisma.noticia.findFirst({
        where: {
          OR: [
            { titulo: item.titulo },
            { url: item.url }
          ]
        }
      });

      if (existing) return;

      // Analizar relevancia y extraer candidatos/temas relacionados
      const analysis = await this.analyzeNewsItem(item);

      await prisma.noticia.create({
        data: {
          titulo: item.titulo,
          resumen: item.resumen,
          fuente: item.fuente,
          url: item.url,
          fechaPublicacion: item.fechaPublicacion,
          imagenUrl: item.imagenUrl,
          relevancia: analysis.relevancia,
          candidatosRelacionados: analysis.candidatos,
          temasRelacionados: analysis.temas,
          tags: analysis.tags,
          verificada: false
        }
      });
    } catch (error) {
      console.error('Error saving news item:', error);
    }
  }

  private async analyzeNewsItem(item: any): Promise<{
    relevancia: string;
    candidatos: string[];
    temas: string[];
    tags: string[];
  }> {
    try {
      // Obtener candidatos y temas para búsqueda
      const candidatos = await prisma.candidato.findMany({
        select: { id: true, nombreCompleto: true, apellidos: true }
      });
      
      const temas = await prisma.tema.findMany({
        select: { id: true, nombre: true }
      });

      const text = `${item.titulo} ${item.resumen}`.toLowerCase();
      
      // Buscar candidatos mencionados
      const candidatosRelacionados = candidatos
        .filter(c => {
          const apellidosArr = c.apellidos.toLowerCase().split(' ');
          return apellidosArr.some(apellido => text.includes(apellido.toLowerCase()));
        })
        .map(c => c.id);

      // Buscar temas relacionados
      const temasRelacionados = temas
        .filter(t => text.includes(t.nombre.toLowerCase()))
        .map(t => t.id);

      // Determinar relevancia
      let relevancia = 'baja';
      if (candidatosRelacionados.length > 0) relevancia = 'alta';
      else if (temasRelacionados.length > 1) relevancia = 'media';

      // Generar tags
      const keywords = ['elecciones', 'candidato', 'propuesta', 'política', 'gobierno', 'congreso', 'presidente'];
      const tags = keywords.filter(keyword => text.includes(keyword));

      return {
        relevancia,
        candidatos: candidatosRelacionados,
        temas: temasRelacionados,
        tags
      };
    } catch (error) {
      console.error('Error analyzing news item:', error);
      return {
        relevancia: 'baja',
        candidatos: [],
        temas: [],
        tags: []
      };
    }
  }

  async scrapeSocialMedia(candidatoId: string): Promise<any[]> {
    try {
      const candidato = await prisma.candidato.findUnique({
        where: { id: candidatoId },
        include: { partido: true }
      });

      if (!candidato?.redesSociales) return [];

      const results: any[] = [];
      const redes = candidato.redesSociales as any;

      // Twitter/X scraping (simulado por limitaciones de API)
      if (redes.twitter) {
        results.push({
          tipo: 'twitter',
          contenido: `Última actividad en Twitter de ${candidato.nombreCompleto}`,
          url: redes.twitter,
          fecha: new Date(),
          plataforma: 'Twitter/X'
        });
      }

      // Facebook scraping (simulado)
      if (redes.facebook) {
        results.push({
          tipo: 'facebook',
          contenido: `Actividad reciente en Facebook de ${candidato.nombreCompleto}`,
          url: redes.facebook,
          fecha: new Date(),
          plataforma: 'Facebook'
        });
      }

      return results;
    } catch (error) {
      console.error('Error scraping social media:', error);
      return [];
    }
  }

  async scrapeOfficialSites(): Promise<any[]> {
    try {
      const candidatos = await prisma.candidato.findMany({
        where: { 
          estado: 'activo',
          sitioWeb: { not: null }
        },
        include: { partido: true }
      });

      const results: any[] = [];

      for (const candidato of candidatos) {
        if (!candidato.sitioWeb) continue;

        try {
          await this.initBrowser();
          if (!this.browser) continue;

          const page = await this.browser.newPage();
          await page.goto(candidato.sitioWeb, { waitUntil: 'networkidle' });
          
          const content = await page.content();
          const $ = cheerio.load(content);

          // Buscar propuestas y noticias en el sitio oficial
          const propuestas = this.extractOfficialContent($, candidato);
          results.push(...propuestas);

          await page.close();
        } catch (error) {
          console.error(`Error scraping ${candidato.sitioWeb}:`, error);
        }
      }

      return results;
    } catch (error) {
      console.error('Error scraping official sites:', error);
      return [];
    }
  }

  private extractOfficialContent($: any, candidato: any): any[] {
    const content: any[] = [];
    
    // Buscar secciones de propuestas
    const propuestaSelectors = [
      '.propuesta, .proposal',
      '.plan-gobierno, .government-plan',
      '.compromiso, .commitment',
      '.proyecto, .project'
    ];

    propuestaSelectors.forEach(selector => {
      $(selector).each((index: number, element: any) => {
        const $element = $(element);
        const title = $element.find('h1, h2, h3, h4, .title').first().text().trim();
        const description = $element.find('p, .description, .content').first().text().trim();

        if (title && description && title.length > 10) {
          content.push({
            tipo: 'propuesta_oficial',
            titulo: title,
            contenido: description,
            candidatoId: candidato.id,
            fuente: `Sitio oficial - ${candidato.nombreCompleto}`,
            fecha: new Date(),
            url: candidato.sitioWeb
          });
        }
      });
    });

    return content;
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  // Método para obtener estadísticas del scraping
  async getScrapingStats(): Promise<any> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await prisma.noticia.groupBy({
      by: ['fuente'],
      where: {
        createdAt: { gte: today }
      },
      _count: true
    });

    return {
      hoy: stats,
      total: await prisma.noticia.count(),
      ultimaActualizacion: await prisma.noticia.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true }
      })
    };
  }
}

export const scrapingEngine = new WebScrapingEngine();
