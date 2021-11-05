import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export enum AccountRole {
  worker = 'worker',
  admin = 'admin',
}

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  publicId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: AccountRole;
}
