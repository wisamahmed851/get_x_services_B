import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminRolesService } from './admin-roles.service';
import { CreateAdminRoleDto, UpdateAdminRoleDto } from './dtos/admin-role.dto';

@Controller('admin-roles')
export class AdminRolesController {
  constructor(private readonly service: AdminRolesService) {}

  @Post('store')
  create(@Body() dto: CreateAdminRoleDto) {
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
  update(@Param('id') id: number, @Body() dto: UpdateAdminRoleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
