import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesCategory } from "./entity/services-category.entity";
import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryController } from "./services-category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ServicesCategory])],
    controllers: [ServicesCategoryController],
    providers: [ServicesCategoryService],
})
export class ServicesCategoryModule {}