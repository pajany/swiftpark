import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface Managefaq extends BaseModel {
  id: number;
  user_id: string;
  faq_question: string;
  faq_answer: string;
  category: string;
  
}
