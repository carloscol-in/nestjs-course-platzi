import { IEntity } from 'src/common/interfaces/entities/entity.interface';
import { PrimaryGeneratedColumn, Column, Entity, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({
    type: 'timestampz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestampz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
