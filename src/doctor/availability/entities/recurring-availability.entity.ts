import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { DoctorProfile } from '../../entities/doctor-profile.entity';
import { DayOfWeek } from '../../../common/enums/day-of-week.enum';

@Entity('recurring_availabilities')
export class RecurringAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek!: DayOfWeek;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @ManyToOne(
    () => DoctorProfile,
    (doctor) => doctor.recurringAvailabilities,
    {
      onDelete: 'CASCADE',
    },
  )
  doctor!: DoctorProfile;
}