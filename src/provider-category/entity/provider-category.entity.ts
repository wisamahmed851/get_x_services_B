// provider-category.entity.ts
import { ServicesCategory } from 'src/services-category/entity/services-category.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('provider_categories')
export class ProviderCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    provider_id: number;
    
    @ManyToOne(() => User, (user) => user.providerCategories)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column()
    category_id: number;
    @ManyToOne(() => ServicesCategory, (category) => category.providerCategories)
    @JoinColumn({ name: 'category_id' })
    servicescategory: ServicesCategory;
}
