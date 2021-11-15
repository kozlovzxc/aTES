import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  AccountEntity,
  AccountRole,
  getPublicAccountEntity,
  PublicAccountEntity,
} from './account.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { nanoid } from 'nanoid'
import { PublisherService } from '../common/publisher.service'
import accountCreatedSchema from '../../../schema-registry/schemas/account/created/1.json'
import Ajv from 'ajv'

const ajv = new Ajv()
// console.log(accountCreatedSchema);
const accountCreatedValidator = ajv.compile(accountCreatedSchema)

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private publisherService: PublisherService,
  ) {}

  async getOne(
    data: Partial<AccountEntity>,
  ): Promise<PublicAccountEntity | undefined> {
    return this.accountRepository.findOne(data)
  }

  async create({
    username,
    password,
    role = AccountRole.worker,
  }: {
    username: string
    password: string
    role?: AccountRole
  }): Promise<PublicAccountEntity> {
    const existingAccount = await this.accountRepository.findOne({ username })
    if (existingAccount != null) {
      throw new HttpException('Account exists', HttpStatus.CONFLICT)
    }

    const publicId = nanoid()
    const newAccount = await this.accountRepository.save({
      publicId,
      username,
      password,
      role,
    })
    const event = {
      event_name: 'AccountCreated',
      event_version: 1,
      data: {
        public_id: newAccount.publicId,
        username: newAccount.username,
        role: newAccount.role,
      },
    }
    const valid = accountCreatedValidator(event)
    if (!valid) {
      // TODO: consider better error handling
      throw new Error('AccountCreated event is invalid')
    }
    this.publisherService.publish('accounts-stream', event)
    return getPublicAccountEntity(newAccount)
  }
}
