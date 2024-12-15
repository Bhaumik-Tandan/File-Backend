import { Schema } from 'mongoose';

const FileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  },
);

export default { name: 'File', schema: FileSchema };