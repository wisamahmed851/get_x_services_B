import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from 'src/auth/user/user-jwt.guard';
import { ComplaintsCategoryService } from './complaints-category.service';
import { AdminJwtAuthGuard } from 'src/auth/admin/admin-jwt.guard';
import { CreateComplainCategoryDto, UpdateComplainCategoryDto } from './dto/complain-category.dto';


@Controller('complaints-category')
@UseGuards(UserJwtAuthGuard)
export class ComplaintsCategoryController {
    constructor(private readonly service: ComplaintsCategoryService) { }
    
  
    
    @Post('store')
        async store(@Body() body: CreateComplainCategoryDto, @Req() req:any){
            const userId =  req.user.id
        return await this.service.create(body,userId);
    }

    @Get('list-all-categories')
        async findAll() {
            return await this.service.findAll();
        }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.service.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateComplainCategoryDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}


function GetUser(arg0: string): (target: ComplaintsCategoryController, propertyKey: "create", parameterIndex: 1) => void {
    throw new Error('Function not implemented.');
}

