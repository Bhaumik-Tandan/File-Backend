import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(@InjectModel('File') private readonly fileModel: Model<File>) {}

  async create(createFileDto: CreateFileDto) {
    const newFile = new this.fileModel(createFileDto);
    return await newFile.save();
  }

  async findAll() {
    return await this.fileModel.find().exec();
  }

  async findOne(id: string) {
    return await this.fileModel.findById(id).exec();
  }


  async update(id: string, updateFileDto: UpdateFileDto) {
    return await this.fileModel
      .findByIdAndUpdate(id, updateFileDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return await this.fileModel.findByIdAndDelete(id).exec();
  }
}
