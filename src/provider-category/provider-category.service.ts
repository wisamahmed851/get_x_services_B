import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProviderCategory } from "./entity/provider-category.entity";
import { User } from "src/users/entity/user.entity";
import { ServicesCategory } from "src/services-category/entity/services-category.entity";
import { AssignCategoriesDto } from "./dtos/provider-category.dto";

@Injectable()
export class ProviderCategoryService {
    constructor(
        @InjectRepository(ProviderCategory)
        private providerCategoryRepository: Repository<ProviderCategory>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(ServicesCategory)
        private categoryRepository: Repository<ServicesCategory>,
    ) { }

    /* ─────────────────────────────── PRIVATE ─────────────────────────────── */
    private handleUnknown(err: unknown): never {
        if (err instanceof BadRequestException || err instanceof NotFoundException) {
            throw err; // preserve 400/404
        }
        throw new InternalServerErrorException("Unexpected error", {
            cause: err as Error,
        });
    }

    /* ─────────────────────────────── PUBLIC ─────────────────────────────── */

    // Assign multiple categories to a provider
    async assignCategories(providerId: number, dto: AssignCategoriesDto) {
        try {
            const provider = await this.userRepository.findOne({
                where: { id: providerId },
                relations: ["userRoles", "userRoles.role"],
            });
            if (!provider) {
                throw new NotFoundException("Provider not found");
            }

            // Ensure role is provider
            const isProvider = provider.userRoles.some(
                (userRole) => userRole.role && userRole.role.name === "provider",
            );
            if (!isProvider) {
                throw new BadRequestException("User is not a provider");
            }

            // Check categories exist
            const categories = await this.categoryRepository.findByIds(dto.categories);
            if (categories.length !== dto.categories.length) {
                throw new BadRequestException("Some categories not found");
            }

            // Remove old assignments (if any)
            await this.providerCategoryRepository.delete({ provider: { id: providerId } });

            // Save new assignments
            const providerCategories = categories.map((category) => {
                const pc = new ProviderCategory();
                pc.provider_id = providerId;
                pc.provider = provider;
                pc.category_id = category.id;
                pc.servicescategory = category;
                return pc;
            });

            const saved = await this.providerCategoryRepository.save(providerCategories);

            return {
                success: true,
                message: "Categories assigned to provider successfully",
                data: saved,
            };
        } catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to assign categories",
                data: null,
            };
        }
    }

    // Get categories of a provider
    async getProviderCategories(providerId: number) {
        try {
            const provider = await this.userRepository.findOne({
                where: { id: providerId },
                relations: ["providerCategories", "providerCategories.servicescategory"],
            });
            if (!provider) {
                throw new NotFoundException("Provider not found");
            }

            const categories = provider.providerCategories.map((pc) => pc.servicescategory);

            return {
                success: true,
                message: "Provider categories fetched successfully",
                data: categories,
            };
        } catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to fetch provider categories",
                data: null,
            };
        }
    }

    // Get providers by category
    async getProvidersByCategory(categoryId: number) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: categoryId },
                relations: ["providerCategories", "providerCategories.provider"],
            });
            if (!category) {
                throw new NotFoundException("Category not found");
            }

            const providers = category.providerCategories.map((pc) => pc.provider);

            return {
                success: true,
                message: "Providers fetched successfully for this category",
                data: providers,
            };
        } catch (error) {
            this.handleUnknown(error);
            return {
                success: false,
                message: error.message || "Failed to fetch providers",
                data: null,
            };
        }
    }
}
