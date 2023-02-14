import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { Book } from '../books/book.entity';
import { UsersService } from './users.service';
import { RoleType } from '../../utils/definitions';
import { hash } from 'bcryptjs';

const users = [
  {
    uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
    firstName: 'Petar',
    lastName: 'Petrovic',
    username: 'petar80',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'petar@gmail.com',
    role: RoleType.Admin,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
  },
  {
    uuid: '956b086d-f22d-43a3-8966-77d412555c34',
    firstName: 'Jovan',
    lastName: 'Markovic',
    username: 'jovan_kos',
    password: '$2a$12$m55yaasWCQIq6F9X/5K4BeQ9BgMw78JwRv.QAx9.eJ3qvf2R1sgUS',
    email: 'jovan@gmail.com',
    role: RoleType.Admin,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deleteAt: null,
  },
];

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    findOne: jest.fn(),
    findAndCountAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USERS_REPOSITORY',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fetch user which exist with username, should return user', async () => {
    const username = 'jovan_kos';

    const user: Partial<User> = users.find(
      (user) => user.username === username,
    );
    const findOneMock = mockUserRepository.findOne.mockResolvedValue(user);

    const result = await service.getUserByUsername(username);

    expect(findOneMock).toHaveBeenCalledWith({
      where: {
        username: username,
      },
      raw: true,
    });

    expect(result?.username).toEqual(username);
  });

  it(`fetch all users will return ${users.length} users`, async () => {
    const mockGetUsers = mockUserRepository.findAndCountAll.mockResolvedValue({
      count: users.length,
      rows: users,
    });

    const query = {
      cursor: 0,
      limit: 10,
    };

    const result = await service.getUsers(query);

    expect(mockGetUsers).toBeCalledWith({
      attributes: { exclude: ['deleteAt'] },
      include: [{ model: Book, as: 'books' }],
      offset: query?.cursor ?? 0,
      limit: query?.limit ?? 10,
    });

    expect(result.count).toEqual(2);
    expect(result.rows[0].username).toBe('petar80');
  });

  it('Create user should create new user in users array', async () => {
    const newUser = {
      uuid: '956b086d-f22d-43a3-8966-77d412555c72',
      firstName: 'Milica',
      lastName: 'Pavkovic',
      username: 'milica30',
      password: 'test123',
      email: 'jovan@gmail.com',
      role: RoleType.Author,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: null,
    };

    const hashPassword = await hash(newUser.password, 12);
    newUser.password = hashPassword;

    mockUserRepository.create.mockResolvedValue(newUser);

    const result = await service.createUser(newUser);

    expect({...result, password: ""}).toStrictEqual({...newUser, password: ""});
  });

  it('Expect that delete of user will remove user and return 1 (1 row deleted)', async () => {

    const id = '956b086d-f22d-43a3-8966-77d412555c34';

    const mockDeleteUser = mockUserRepository.destroy.mockResolvedValue(1)

    const result = await service.softDeleteUser(id);

    expect(mockDeleteUser).toBeCalledWith({
      where: {
        uuid: id,
      },
    });

    expect(result).toBe(1);
  })
});
