import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Book extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING })
  userUid: string;

  @Column
  title: string;

  @Column
  publisher: string;

  @Column
  description: string;

  @Column
  genre: string;

  @Column
  numberOfPages: number;
}
