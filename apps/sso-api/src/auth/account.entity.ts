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

export type PublicAccountEntity = Omit<AccountEntity, 'password'>;

export const getPublicAccountEntity = (
  account: AccountEntity,
): PublicAccountEntity => {
  const publicAccount = { ...account };
  delete publicAccount.password;
  return publicAccount;
};
