import { IsOptional, MinLength } from 'class-validator';

export class CreateContactDto {
  @MinLength(1)
  name: string;

  @MinLength(6)
  number: string;
}

export class UpdateContactDto {
  @MinLength(1)
  @IsOptional()
  name: string;

  @MinLength(6)
  @IsOptional()
  number: string;
}
