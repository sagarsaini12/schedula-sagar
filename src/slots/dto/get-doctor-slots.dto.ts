import {
  IsDateString,
  IsIn,
} from 'class-validator';

export class GetDoctorSlotsDto {
  @IsDateString()
  date!: string;

  @IsIn(['10', '15', '30'])
  duration!: string;
}