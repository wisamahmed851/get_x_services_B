import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module: string;

  @Column()
  action: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar', default: 'admin' }) // 'user' or 'admin'
  guard: string;
}
