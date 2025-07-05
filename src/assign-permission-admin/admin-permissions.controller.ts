// src/admin-permission/admin-permissions.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminPermissionsService } from './admin-permissions.service';
import {
  CreateAdminPermissionDto,
  UpdateAdminPermissionDto,
} from './dtos/admin-permission.dto';

@Controller('admin-permissions')
export class AdminPermissionsController {
  constructor(
    private readonly adminPermissionsService: AdminPermissionsService,
  ) {}

  @Post('store')
  create(@Body() dto: CreateAdminPermissionDto) {
    return this.adminPermissionsService.create(dto);
  }

  @Get('index')
  findAll() {
    return this.adminPermissionsService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.adminPermissionsService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() dto: UpdateAdminPermissionDto) {
    return this.adminPermissionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminPermissionsService.remove(id);
  }
}
