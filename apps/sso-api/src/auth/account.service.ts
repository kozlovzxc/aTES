import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountEntity, AccountRole } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async create({
    username,
    password,
    role = AccountRole.worker,
  }: {
    username: string;
    password: string;
    role?: AccountRole;
  }) {
    const existingAccount = await this.accountRepository.findOne({ username });
    if (existingAccount != null) {
      throw new HttpException('Account exists', HttpStatus.CONFLICT);
    }

    const publicId = nanoid();
    const newAccount = await this.accountRepository.save({
      publicId,
      username,
      password,
      role,
    });
    delete newAccount.password;
    return newAccount;
  }
}
