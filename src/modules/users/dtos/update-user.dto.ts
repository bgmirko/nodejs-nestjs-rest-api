import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

class UpdateUserOmitDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}

export class UpdateUserDto extends PartialType(UpdateUserOmitDto) {}
