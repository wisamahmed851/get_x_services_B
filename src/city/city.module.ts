import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./entity/city.entity";

@Module({
    imports: TypeOrmModule.forFeature([City]),
    providers: [],
    controllers: [].
})
export class CityModule { }