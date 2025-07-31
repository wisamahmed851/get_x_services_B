import { IsNotEmpty } from "class-validator";
import { Admin } from "src/admin/entity/admin.entity";
import { User } from "src/users/entity/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "zones" })
export class Zone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column()
    created_by: number;

    @ManyToOne(() => Admin)
    @JoinColumn({ name: 'created_by' })
    admin: Admin;

    @OneToMany(() => User, (user) => user.zone)
    users: User[];

    @Column({ type: 'date' })
    created_at: string;

    @Column({ type: 'date' })
    updated_at: string;

    @BeforeInsert()
    setCreateDateParts() {
        const today = new Date();
        const onlyDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        this.created_at = onlyDate;
        this.updated_at = onlyDate;
    }
}