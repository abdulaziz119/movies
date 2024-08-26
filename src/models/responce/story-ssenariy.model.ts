import {BaseModel, SsenariyWithRelationModel} from ".";

export interface StorySsenariyModel extends BaseModel {
  user_id: number;
  ssenariy_id: number;
  date_start: Date;
  days: DayForSsenariyModel[];
  completed_at: Date | null;
}

export interface StorySsenariyWithRelationModel extends StorySsenariyModel {
  ssenariy: SsenariyWithRelationModel
}

export interface DayForSsenariyModel extends BaseModel {
  serial_number: number;
  condition: boolean;
}