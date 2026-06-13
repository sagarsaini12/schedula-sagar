import { IsDateString } from 'class-validator';

export class GetAvailabilityByDateDto {
  @IsDateString()
  date!: string;
}