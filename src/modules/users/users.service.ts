import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }

  async createUser(body: CreateUserDto): Promise<User> {
    return this.usersRepository.create({ ...body });
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        uuid: id,
      },
      attributes: { exclude: ['password'] },
      raw: true,
    });
  }

  /*
   * Update User data
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await this.usersRepository.update(
      {
        ...userData,
      },
      {
        where: {
          uuid: id,
        },
      },
    );

    return this.getUserById(id);
  }

  async softDeleteUser(id: string): Promise<number> {
    return this.usersRepository.destroy({
      where: {
        uuid: id,
      },
    });
  }
}
