import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from './roles.models';
import { User } from '../users/users.models';

@Table({ tableName: 'user_roles', updatedAt: false, createdAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role) // Декоратор указывающий на что этот клюя ссылается
  @Column({
    type: DataType.INTEGER,
  })
  roleId: number;

  @ForeignKey(() => User) // Декоратор указывающий на что этот клюя ссылается
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
