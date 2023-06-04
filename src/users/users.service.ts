import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.models';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.models';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private usersRepository: typeof Users,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<Users> {
    const user: Users = await this.usersRepository.create(dto);
    const role: Role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(): Promise<Users[]> {
    const users: Promise<Users[]> = this.usersRepository.findAll({
      include: { all: true },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user: Users = await this.usersRepository.findByPk(dto.userId);
    const role: Role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto) {
    const user: Users = await this.usersRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
