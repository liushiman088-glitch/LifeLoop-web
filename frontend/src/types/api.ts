// LL-SPEC-002 v2.1.0 的前端草案类型。
// B 交付 contracts/openapi.yaml 后，必须以 OpenAPI 为准逐项核对。
export type ExtractionStatus = 'unprocessed' | 'proposed' | 'confirmed' | 'user_edited';

export interface FieldSource {
  field: 'event' | 'emotions' | 'triggers' | 'thoughts' | 'behaviors' | 'topics' | 'people' | 'event_date' | 'event_time_text';
  value: string;
  quote: string;
}

export interface Memory {
  memory_id: string;
  raw_text: string;
  event: string | null;
  emotions: string[];
  triggers: string[];
  thoughts: string[];
  behaviors: string[];
  topics: string[];
  people: string[];
  event_date: string | null;
  event_time_text: string | null;
  extraction_status: ExtractionStatus;
  field_sources: FieldSource[];
  source: 'manual' | 'paste';
  source_app: string | null;
  analysis_allowed: boolean;
  content_version: number;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  error_code: string;
  message: string;
  request_id: string | null;
}

export interface MemoryCreate {
  raw_text: string;
  analysis_allowed: boolean;
  extraction_status: Exclude<ExtractionStatus, 'proposed'>;
  source: 'manual' | 'paste';
  source_app?: string | null;
  event?: string | null;
  emotions?: string[];
  triggers?: string[];
  thoughts?: string[];
  behaviors?: string[];
  topics?: string[];
  people?: string[];
  event_date?: string | null;
  event_time_text?: string | null;
  field_sources?: FieldSource[];
}

export interface ExtractionRequest {
  raw_text: string;
  reference_date: string;
  timezone: string;
  consent: true;
}

export interface ExtractionEnvelope {
  request_id: string;
  request_status: 'succeeded';
  purpose: 'extraction';
  result: Omit<Memory, 'memory_id' | 'raw_text' | 'analysis_allowed' | 'content_version' | 'created_at' | 'updated_at' | 'source' | 'source_app' | 'extraction_status'> & { schema_version: '2.0.0' };
}
