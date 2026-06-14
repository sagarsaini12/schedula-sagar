import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';

import { DoctorProfile } from '../doctor/entities/doctor-profile.entity';
import { RecurringAvailability } from '../doctor/availability/entities/recurring-availability.entity';
import { CustomAvailability } from '../doctor/availability/entities/custom-availability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorProfile,
      RecurringAvailability,
      CustomAvailability,
    ]),
  ],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}