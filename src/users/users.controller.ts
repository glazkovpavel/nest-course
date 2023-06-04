import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from './users.models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи') // @ApiTags Декоратор для эндпойнта в документации swagger
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200, type: Users })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200, type: [Users] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Выдать роль' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' }) // Декораторы для документации в Swagger
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto): Promise<Users> {
    return this.usersService.ban(dto);
  }
}
