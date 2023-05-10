import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { RoleType } from '../../utils/definitions';
import { Book } from '../books/book.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  role: RoleType;

  @Column
  active: boolean;

  @HasMany(() => Book, {
    foreignKey: 'userUid',
  })
  books: Book[];
}
