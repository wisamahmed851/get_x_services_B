import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos/role.dto';
import { AdminJwtAuthGuard } from 'src/auth/admin/admin-jwt.guard';

@Controller('roles')
@UseGuards(AdminJwtAuthGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('store')
  async create(@Body() data: CreateRoleDto) {
    return await this.rolesService.create(data);
  }

  @Get('index')
  async index() {
    return await this.rolesService.index();
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() data: UpdateRoleDto) {
    return this.rolesService.update(data, id);
  }
}
