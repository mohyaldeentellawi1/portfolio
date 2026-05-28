export interface Review {
  id: number;
  name: string;
  nameEn?: string;
  content: string;
  contentEn?: string;
  createdAt: Date;
  updatedAt: Date;
}
