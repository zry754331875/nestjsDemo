import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { FindOneOptions, InsertResult, ObjectID, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { User as UserClass } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(user: UserClass): Promise<InsertResult> {
    const userEntity = this.usersRepository.create(user);
    return this.usersRepository.insert(userEntity);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByUserName(firstName: string, password: string): Promise<User> {
    return this.usersRepository.findOne({
      firstName: firstName,
      password: password,
    });
  }

  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<User>,
  ): Promise<User> {
    return this.usersRepository.findOne(id, options);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
