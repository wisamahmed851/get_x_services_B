import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminsService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/utils/multer.config';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('store')
  @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
  create(
    @Body() dto: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file?.filename;
    return this.adminsService.create(dto, image);
  }

  @Get('index')
  findAll() {
    return this.adminsService.findAll();
  }
  @Get('active')
  allAvtive() {
    return this.adminsService.allAvtive();
  }

  @Get('findOne/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.findOne(id);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file?.filename;
    return this.adminsService.update(id, { ...dto, image });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.remove(id);
  }

  @Get('toogleStatus/:id')
  statusChange(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.statusUpdate(id);
  }
}
