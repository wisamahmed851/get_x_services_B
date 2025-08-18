import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesCategory } from "./entity/services-category.entity";
import { ServicesCategoryService } from "./services-category.service";
import { ServicesCategoryController } from "./services-category.controller";
import { ServicesCategoryProviderController } from "./services-category-users.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ServicesCategory])],
    controllers: [ServicesCategoryController, ServicesCategoryProviderController],
    providers: [ServicesCategoryService],
})
export class ServicesCategoryModule { }