import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  publicId: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
