import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos/user-role.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly service: UserRolesService) {}

  @Post('store')
  create(@Body() dto: CreateUserRoleDto) {
    return this.service.create(dto);
  }

  @Get('index')
  findAll() {
    return this.service.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() dto: UpdateUserRoleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
