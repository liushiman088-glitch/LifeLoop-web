import type { Memory } from './types/api';

export const DEMO_MEMORIES: Memory[] = [
  {
    memory_id: 'demo-memory-001', raw_text: '聚会前有些紧张。朋友问起我的近况，我慢慢说了几句，后来轻松了一点，但还是不太想说太多。',
    event: '与朋友聚会', emotions: ['紧张', '轻松'], triggers: ['朋友问起我的近况'], thoughts: ['担心自己不知道说什么'], behaviors: ['慢慢说了几句'], topics: ['朋友', '交流'], people: ['朋友'], event_date: '2026-09-10', event_time_text: '今天', extraction_status: 'confirmed', source: 'manual', source_app: null, analysis_allowed: true, content_version: 1, created_at: '2026-09-10T10:20:00+08:00', updated_at: '2026-09-10T10:20:00+08:00',
    field_sources: [{ field: 'event', value: '与朋友聚会', quote: '聚会前有些紧张' }, { field: 'emotions', value: '紧张', quote: '聚会前有些紧张' }, { field: 'emotions', value: '轻松', quote: '后来轻松了一点' }, { field: 'triggers', value: '朋友问起我的近况', quote: '朋友问起我的近况' }, { field: 'behaviors', value: '慢慢说了几句', quote: '我慢慢说了几句' }],
  },
  {
    memory_id: 'demo-memory-002', raw_text: '和家人通完电话，有点想家，也觉得被惦记着。', event: '和家人通电话', emotions: ['想家', '温暖'], triggers: ['通话结束'], thoughts: [], behaviors: [], topics: ['家人'], people: ['家人'], event_date: '2026-09-09', event_time_text: '昨天', extraction_status: 'user_edited', field_sources: [], source: 'manual', source_app: null, analysis_allowed: true, content_version: 2, created_at: '2026-09-09T21:10:00+08:00', updated_at: '2026-09-10T09:00:00+08:00',
  },
  {
    memory_id: 'demo-memory-003', raw_text: '一个人在湖边走了走。风很轻，我没有急着想明白什么，只觉得安静。', event: '一个人散步', emotions: ['平静'], triggers: [], thoughts: [], behaviors: ['在湖边散步'], topics: ['独处'], people: [], event_date: '2026-09-08', event_time_text: null, extraction_status: 'confirmed', source: 'paste', source_app: '备忘录', analysis_allowed: false, content_version: 1, created_at: '2026-09-08T19:30:00+08:00', updated_at: '2026-09-08T19:30:00+08:00', field_sources: [{ field: 'emotions', value: '平静', quote: '只觉得安静' }, { field: 'behaviors', value: '在湖边散步', quote: '在湖边走了走' }],
  },
];
