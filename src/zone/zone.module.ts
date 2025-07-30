import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Zone } from "./entity/zone.entity";
import { ZoneController } from "./zone.controller";
import { ZoneService } from "./zone.service";

@Module({
    imports: [TypeOrmModule.forFeature([Zone])],
    providers: [ZoneService],
    controllers: [ZoneController],
})
export class ZoneModule { }