import { Document } from 'mongoose';
export interface File extends Document {
  fileName: string;
  fileContent: string;
}
