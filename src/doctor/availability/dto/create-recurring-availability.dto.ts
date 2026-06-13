import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { DayOfWeek } from '../../../common/enums/day-of-week.enum';

export class CreateRecurringAvailabilityDto {
  @IsEnum(DayOfWeek)
  dayOfWeek!: DayOfWeek;

  @IsString()
  @IsNotEmpty()
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  endTime!: string;
}