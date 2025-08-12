import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServicesCategory } from "./entity/services-category.entity";
import { Repository } from "typeorm";
import { ServicesCategoryDto } from "./dtos/services-category.dto";

@Injectable()
export class ServicesCategoryService {
    constructor(
        @InjectRepository(ServicesCategory)
        private servicesCategoryRepository: Repository<ServicesCategory>,
    ) { }
    /* ─────────────────────────────── PRIVATE ─────────────────────────────── */
    private handleUnknown(err: unknown): never {
        if (
            err instanceof BadRequestException ||
            err instanceof NotFoundException
        ) {
            throw err; // preserve intended HTTP code
        }
        throw new InternalServerErrorException('Unexpected error', {
            cause: err as Error,
        });
    }
    async createCategory(data: ServicesCategoryDto) {
        try {
            const newCategory = this.servicesCategoryRepository.create(data);
            const savedCategory = await this.servicesCategoryRepository.save(newCategory);
            return {
                success: true,
                message: "Service category created successfully",
                data: savedCategory,
            };
        } catch (error) {
            console.log("Some thing went wrong" + error);
            this.handleUnknown(error);
        }
    }

}