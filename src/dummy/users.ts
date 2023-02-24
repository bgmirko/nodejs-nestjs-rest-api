import { User } from 'modules/users/user.entity';
import { RoleType } from '../utils/definitions';

export const users: Partial<User>[] = [
  {
    uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
    firstName: 'Petar',
    active: true,
    lastName: 'Petrovic',
    username: 'petar80',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'petar@gmail.com',
    role: RoleType.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    uuid: '333b086d-f22d-43a3-8966-77d412555tgy',
    firstName: 'Ivana',
    active: true,
    lastName: 'Mandic',
    username: 'ivana_fx',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'ivana@gmail.com',
    role: RoleType.Author,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
