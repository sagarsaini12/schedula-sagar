import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async create(userData: Partial<User>) {
    const existing = await this.findByEmail(userData.email!);

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create(userData);

    return this.usersRepository.save(user);
  }
}