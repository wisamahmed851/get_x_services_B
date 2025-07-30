import { Controller, Post, Get, Param, Body, ParseIntPipe, Patch, UseGuards } from "@nestjs/common";
import { ZoneService } from "./zone.service";
import { AdminJwtAuthGuard } from "src/auth/admin/admin-jwt.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller('admin/city')
@UseGuards(AdminJwtAuthGuard)
export class ZoneController {
    constructor(private readonly zoneService: ZoneService) { }

    @Post('store')
    createCity(@Body('name') name: string, @CurrentUser('id') created_by: number) {
        return this.zoneService.createZone(name, created_by);
    }

    @Get('list')
    getAllCities() {
        return this.zoneService.getAllZones();
    }

    @Get('show/:id')
    getZoneById(@Param('id', ParseIntPipe) id: number) {
        return this.zoneService.getZoneById(id);
    }

    @Patch('update/:id')
    updateZone(@Param('id', ParseIntPipe) id: number, @Body('name') name: string) {
        return this.zoneService.updateZone(id, name);
    }


}
