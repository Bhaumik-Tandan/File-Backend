import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import FileSchema from './entities/file.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([FileSchema])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
