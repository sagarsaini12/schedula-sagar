import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePatientProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsNumber()
  age!: number;

  @IsString()
  @IsNotEmpty()
  gender!: string;

  @IsString()
  @IsNotEmpty()
  contactDetails!: string;

  @IsOptional()
  @IsString()
  healthInformation?: string;
}