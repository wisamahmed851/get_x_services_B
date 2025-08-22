import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProviderCategory } from "./entity/provider-category.entity";
import { ProviderCategoryService } from "./provider-category.service";
import { ProviderCategoryController } from "./provider-category.controller";
import { User } from "src/users/entity/user.entity";
import { ServicesCategory } from "src/services-category/entity/services-category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProviderCategory, User, ServicesCategory])],
    controllers: [ProviderCategoryController],
    providers: [ProviderCategoryService],
    exports: [ProviderCategoryService],
})
export class ProviderCategoryModule { }
