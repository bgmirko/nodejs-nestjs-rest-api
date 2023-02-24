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
  {
    uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf2d8',
    firstName: 'Ana',
    lastName: 'Zaric',
    username: 'anaana',
    password: '$2a$12$0N4PGM8apYEWFiC2pY8FU.boLS6YqXGkkUqWraDYJR0QfiJVIRU.y',
    email: 'ana@gmail.com',
    role: RoleType.Author,
    active: true,
    createdAt: '2023-01-25T15:26:09.196Z',
    updatedAt: '2023-01-25T15:26:09.196Z',
  },
];
