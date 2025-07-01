import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/utils/multer.config';
import { UserDetailsDto } from './dtos/user_details.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('store')
  @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
  Store(
    @Body() user: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file ? file.filename : null;
    if (!image) {
      throw new Error('Image file is required');
    }
    return this.userService.storeUser({ ...user, image });
  }

  @Get('index')
  idnex() {
    return this.userService.idnex();
  }

  @Get('findOne/:id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Post('findOnebyEmail')
  findOneByEmail(@Body() data: any) {
    console.log(data.email);
    return this.userService.findOnByEmail(data.email);
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image', multerConfig('uploads')))
  update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = file?.filename;
    return this.userService.updateUser(id, { ...user, image });
  }

  @Get('toogleStatus/:id')
  statusChange(@Param('id', ParseIntPipe) id: number) {
    return this.userService.statusUpdate(id);
  }

  // crud of user details
  // @Post("detailsCreate")
  // userDetailsStore(
  //   @Body() data: UserDetailsDto,
  //   @Req() req: Request,
  // )
}
