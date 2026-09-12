/** 独立的内存演示模型，不是后端 API 契约。 */
export interface DemoRecord {
 demoId: string;
 displayNumber: number;
 text: string;
 date: string;
 tags: string[];
 allowed: boolean;
}
