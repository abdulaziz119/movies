export interface BaseModel {
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  id?: number;
  status?: any;
  count?:number;
}

export interface AuthenticatedModel {
  user_id: number;
  language?: string;
}
