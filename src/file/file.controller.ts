import {
  Controller, // <-- Add this import
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileFilterCallback } from 'multer';
import { Express } from 'multer';

@Controller('files') 
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        if (extname(file.originalname) !== '.txt') {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileContent = file.buffer.toString('utf8');

    const createFileDto: CreateFileDto = {
      fileName: file.originalname,
      fileContent: fileContent,
    };

    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
