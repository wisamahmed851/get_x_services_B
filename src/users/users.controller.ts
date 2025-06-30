import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('store')
  @UseInterceptors(
    FileInterceptor('image', {
        storage: diskStorage({
            destination: resolve('uploads'),
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
                const ext  = extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                cb(null, filename);
            },
        }),
    }),
  )
  Store(
    @Body() user: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
){
    const image = file ? file.filename : null;
    if (!image) {
        throw new Error('Image file is required');
    }
    return this.userService.storeUser({...user, image});
  }
}
