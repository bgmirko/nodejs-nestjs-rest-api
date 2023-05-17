import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
