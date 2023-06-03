import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.models';
import { UserRoles } from './user-roles.model';

interface IRoleCreationAttrs {
  value: string;
  description: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttrs> {
  // @ApiProperty Декоратор для документации в Swagger описывает поля таблицы
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальное значение роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => Users, () => UserRoles)
  users: Users[];
}
