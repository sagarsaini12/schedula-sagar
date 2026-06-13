import { PartialType } from '@nestjs/swagger';

import { CreateRecurringAvailabilityDto } from './create-recurring-availability.dto';

export class UpdateRecurringAvailabilityDto extends PartialType(
  CreateRecurringAvailabilityDto,
) {}