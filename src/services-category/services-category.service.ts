import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServicesCategory } from "./entity/services-category.entity";
import { ServicesCategoryDto } from "./dtos/services-category.dto";

@Injectable()
export class ServicesCategoryService {
    constructor(
        @InjectRepository(ServicesCategory)
        private servicesCategoryRepository: Repository<ServicesCategory>,
    ) { }

    /* ─────────────────────────────── PRIVATE ─────────────────────────────── */
    private handleUnknown(err: unknown): never {
        if (err instanceof BadRequestException || err instanceof NotFoundException) {
            throw err; // preserve intended HTTP code
        }
        throw new InternalServerErrorException('Unexpected error', {
            cause: err as Error,
        });
    }

    private isEmptyArray(arr: any[]): boolean {
        return !arr || arr.length === 0;
    }

    private isEmptyObject(obj: object | null | undefined): boolean {
        return !obj || Object.keys(obj).length === 0;
    }

    /* ─────────────────────────────── CREATE ─────────────────────────────── */
    async createCategory(data: ServicesCategoryDto) {
        try {
            if (!data || !data.name) {
                throw new BadRequestException("Category name is required");
            }

            const exists = await this.servicesCategoryRepository.findOne({ where: { name: data.name } });
            if (exists) {
                throw new BadRequestException("Category with this name already exists");
            }

            const newCategory = this.servicesCategoryRepository.create(data);
            const savedCategory = await this.servicesCategoryRepository.save(newCategory);

            return {
                success: true,
                message: "Service category created successfully",
                data: savedCategory,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }

    /* ─────────────────────────────── INDEX (Get All) ─────────────────────────────── */
    async findAll() {
        try {
            const categories = await this.servicesCategoryRepository.find();

            if (this.isEmptyArray(categories)) {
                return {
                    success: true,
                    message: "No service categories found",
                    data: [],
                };
            }

            return {
                success: true,
                message: "Service categories retrieved successfully",
                data: categories,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }

    /* ─────────────────────────────── FIND ONE ─────────────────────────────── */
    async findOneById(id: number) {
        try {
            if (!id) {
                throw new BadRequestException("Category ID is required");
            }

            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new NotFoundException(`Service category with ID ${id} not found`);
            }

            return {
                success: true,
                message: "Service category retrieved successfully",
                data: category,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }

    /* ─────────────────────────────── UPDATE ─────────────────────────────── */
    async updateCategory(id: number, data: Partial<ServicesCategoryDto>) {
        try {
            if (!id) {
                throw new BadRequestException("Category ID is required");
            }
            if (this.isEmptyObject(data)) {
                throw new BadRequestException("Update data is required");
            }

            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new NotFoundException(`Service category with ID ${id} not found`);
            }

            Object.assign(category, data, { updated_at: new Date().toISOString().split('T')[0] });
            const updatedCategory = await this.servicesCategoryRepository.save(category);

            return {
                success: true,
                message: "Service category updated successfully",
                data: updatedCategory,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }

    /* ─────────────────────────────── TOGGLE STATUS ─────────────────────────────── */
    async toggleStatus(id: number) {
        try {
            if (!id) {
                throw new BadRequestException("Category ID is required");
            }

            const category = await this.servicesCategoryRepository.findOne({ where: { id } });
            if (!category) {
                throw new NotFoundException(`Service category with ID ${id} not found`);
            }

            category.status = category.status === 1 ? 0 : 1;
            category.updated_at = new Date().toISOString().split('T')[0];
            const updatedCategory = await this.servicesCategoryRepository.save(category);

            return {
                success: true,
                message: `Service category status changed to ${updatedCategory.status === 1 ? 'active' : 'inactive'}`,
                data: updatedCategory,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }

    /* ─────────────────────────────── FIND ALL FOR LIST ─────────────────────────────── */
    async findAllForList(limit?: number, offset?: number, page?: number) {
        try {
            if (page && limit) {
                offset = (page - 1) * limit;
            }
            
            if (limit && offset != undefined) {
                const [categories, total] = await this.servicesCategoryRepository.findAndCount({
                    skip: offset,
                    take: limit,
                    // order: { created_at: "DESC" }
                });

                return {
                    success: true,
                    message: "Service categories retrieved with pagination",

                    data: {
                        total,
                        limit: Number(limit),
                        offset: Number(offset),
                        categories,
                    },
                };
            }

            const categories = await this.servicesCategoryRepository.find();
            if (this.isEmptyArray(categories)) {
                return {
                    success: true,
                    message: "No service categories found",
                    data: [],
                };
            }
            return {
                success: true,
                message: "Service categories retrieved successfully",
                data: categories,
            };
        } catch (error) {
            this.handleUnknown(error);
        }
    }
}
