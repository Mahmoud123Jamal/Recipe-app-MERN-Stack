export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}
