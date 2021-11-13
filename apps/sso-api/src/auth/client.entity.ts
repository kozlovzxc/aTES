import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicId: string;

  @Column()
  clientId: string;

  @Column()
  clientSecret: string;
}
