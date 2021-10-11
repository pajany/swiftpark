import { BaseModel } from '../../../_metronic/shared/crud-table';

export interface CourtesyCard extends BaseModel {
  id: number;
  card_no: string;
  calls: string;
  card_type: string;
  card_vaild: string;
  status: string;
}
