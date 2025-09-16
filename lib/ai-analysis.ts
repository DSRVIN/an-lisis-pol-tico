
export interface AnalysisRequest {
  tipo: 'propuesta' | 'discurso' | 'trayectoria' | 'comparacion' | 'consulta';
  contenido: string;
  contexto?: string;
  candidatoId?: string;
  propuestaId?: string;
}

export interface AnalysisResult {
  resumen: string;
  analisis: string;
  sentimiento: 'positivo' | 'negativo' | 'neutro';
  keywords: string[];
  clasificacion: any;
  confianza: number;
}

export class AIAnalysisEngine {
  private apiKey: string;
  private baseUrl = 'https://apps.abacus.ai/v1/chat/completions';

  constructor() {
    this.apiKey = process.env.ABACUSAI_API_KEY || '';
  }

  async analyzeContent(request: AnalysisRequest): Promise<AnalysisResult> {
    try {
      const prompt = this.buildAnalysisPrompt(request);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto analista político especializado en el contexto peruano. Tu tarea es analizar contenido político de manera objetiva, identificar temas clave, sentimientos y proporcionar análisis estructurado.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: "json_object" },
          max_tokens: 3000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);

      return {
        resumen: result.resumen || '',
        analisis: result.analisis || '',
        sentimiento: result.sentimiento || 'neutro',
        keywords: result.keywords || [],
        clasificacion: result.clasificacion || {},
        confianza: result.confianza || 0.8
      };
    } catch (error) {
      console.error('Error in AI analysis:', error);
      throw error;
    }
  }

  private buildAnalysisPrompt(request: AnalysisRequest): string {
    const basePrompt = `
Analiza el siguiente contenido político peruano y proporciona un análisis estructurado:

CONTENIDO A ANALIZAR:
${request.contenido}

${request.contexto ? `CONTEXTO ADICIONAL: ${request.contexto}` : ''}

TIPO DE ANÁLISIS: ${request.tipo}

Responde en formato JSON con la siguiente estructura exacta:
{
  "resumen": "Resumen conciso del contenido (máximo 200 caracteres)",
  "analisis": "Análisis detallado y objetivo del contenido político",
  "sentimiento": "positivo|negativo|neutro",
  "keywords": ["palabra1", "palabra2", "palabra3"],
  "clasificacion": {
    "tema_principal": "tema identificado",
    "subtemas": ["subtema1", "subtema2"],
    "relevancia": "alta|media|baja",
    "impacto_potencial": "descripción del impacto"
  },
  "confianza": 0.95
}

Considera el contexto político peruano actual, los candidatos principales para 2026, y los temas más relevantes como economía, educación, salud, seguridad, corrupción, infraestructura y medio ambiente.

Responde únicamente con JSON válido, sin bloques de código ni markdown.`;

    return basePrompt;
  }

  async compareContent(content1: string, content2: string, context?: string): Promise<any> {
    try {
      const prompt = `
Compara los siguientes dos contenidos políticos y proporciona un análisis comparativo:

CONTENIDO 1:
${content1}

CONTENIDO 2:
${content2}

${context ? `CONTEXTO: ${context}` : ''}

Responde en formato JSON con esta estructura:
{
  "similitudes": ["similitud1", "similitud2"],
  "diferencias": ["diferencia1", "diferencia2"],
  "analisis_detallado": "Análisis completo de la comparación",
  "conclusion": "Conclusión principal de la comparación",
  "recomendacion": "Recomendación para los votantes"
}

Responde únicamente con JSON válido.`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un analista político experto que realiza comparaciones objetivas entre propuestas y candidatos políticos peruanos.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          response_format: { type: "json_object" },
          max_tokens: 2000,
        }),
      });

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error comparing content:', error);
      throw error;
    }
  }

  async answerQuery(query: string, context?: string): Promise<string> {
    try {
      const prompt = `
Como experto en política peruana, responde la siguiente consulta de manera objetiva e informativa:

CONSULTA: ${query}

${context ? `CONTEXTO ADICIONAL: ${context}` : ''}

Proporciona una respuesta completa, objetiva y basada en información verificable sobre la política peruana actual, candidatos para 2026, partidos políticos y temas relevantes.

Estructura tu respuesta de manera clara y útil para ciudadanos que buscan información política objetiva.`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un asistente especializado en política peruana que proporciona información objetiva, verificable y útil sobre candidatos, partidos y temas políticos. Siempre mantén neutralidad política y presenta múltiples perspectivas cuando sea relevante.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2500,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error answering query:', error);
      throw error;
    }
  }
}

export const aiAnalysisEngine = new AIAnalysisEngine();

// Instancia global del motor de análisis de IA
export default aiAnalysisEngine;
