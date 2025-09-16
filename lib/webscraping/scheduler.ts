
import * as cron from 'node-cron';
import { scrapingEngine } from './scraper-engine';

export class ScrapingScheduler {
  private jobs: Map<string, cron.ScheduledTask> = new Map();
  private isRunning = false;

  start(): void {
    if (this.isRunning) return;
    
    console.log('🚀 Iniciando scraping en tiempo real...');
    
    // Job cada 15 minutos para noticias principales
    const newsJob = cron.schedule('*/15 * * * *', async () => {
      console.log('📰 Ejecutando scraping de noticias...');
      try {
        const results = await scrapingEngine.scrapeAll();
        console.log(`✅ Scraping completado: ${results.success} éxitos, ${results.failed} fallos`);
      } catch (error) {
        console.error('❌ Error en scraping de noticias:', error);
      }
    });

    // Job cada hora para sitios oficiales
    const officialJob = cron.schedule('0 * * * *', async () => {
      console.log('🏛️ Ejecutando scraping de sitios oficiales...');
      try {
        const results = await scrapingEngine.scrapeOfficialSites();
        console.log(`✅ Scraping oficial completado: ${results.length} elementos procesados`);
      } catch (error) {
        console.error('❌ Error en scraping oficial:', error);
      }
    });

    // Job cada 2 horas para redes sociales
    const socialJob = cron.schedule('0 */2 * * *', async () => {
      console.log('📱 Ejecutando scraping de redes sociales...');
      try {
        const candidatos = await scrapingEngine.scrapeAll();
        console.log(`✅ Scraping social completado`);
      } catch (error) {
        console.error('❌ Error en scraping social:', error);
      }
    });

    this.jobs.set('news', newsJob);
    this.jobs.set('official', officialJob);
    this.jobs.set('social', socialJob);

    // Iniciar todos los jobs
    this.jobs.forEach(job => job.start());
    this.isRunning = true;

    console.log('✅ Scraping en tiempo real iniciado exitosamente');
  }

  stop(): void {
    this.jobs.forEach(job => job.destroy());
    this.jobs.clear();
    this.isRunning = false;
    console.log('🛑 Scraping scheduler detenido');
  }

  getStatus(): { isRunning: boolean; jobCount: number } {
    return {
      isRunning: this.isRunning,
      jobCount: this.jobs.size
    };
  }

  // Ejecutar scraping manual inmediato
  async runImmediate(): Promise<any> {
    console.log('⚡ Ejecutando scraping inmediato...');
    try {
      const results = await scrapingEngine.scrapeAll();
      const officialResults = await scrapingEngine.scrapeOfficialSites();
      
      return {
        noticias: results,
        sitiosOficiales: officialResults,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error en scraping inmediato:', error);
      throw error;
    }
  }
}

export const scrapingScheduler = new ScrapingScheduler();

// Auto-start cuando se importa en producción
if (process.env.NODE_ENV === 'production') {
  scrapingScheduler.start();
}
