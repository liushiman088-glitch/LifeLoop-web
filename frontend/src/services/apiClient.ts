import type { ApiError, ExtractionEnvelope, ExtractionRequest, Memory, MemoryCreate } from '../types/api';

// 对应 E:\AIC-能工智人\lifeloop\contracts_openapi\openapi.yaml（v2.1.0）。
// B 的 app_api 目前仍是 TODO 骨架，因此当前页面不会自动调用这里的函数。
const API_BASE = 'http://127.0.0.1:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error_code: 'NETWORK_ERROR', message: '服务返回了无法识别的错误。', request_id: null })) as ApiError;
    throw error;
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const lifeloopApi = {
  listMemories: () => request<Memory[]>('/api/memories'),
  createMemory: (body: MemoryCreate) => request<Memory>('/api/memories', { method: 'POST', body: JSON.stringify(body) }),
  createExtraction: (body: ExtractionRequest) => request<ExtractionEnvelope>('/api/extractions', { method: 'POST', body: JSON.stringify(body) }),
};
