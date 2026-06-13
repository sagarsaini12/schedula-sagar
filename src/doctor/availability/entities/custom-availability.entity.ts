import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { DoctorProfile } from '../../entities/doctor-profile.entity';

@Entity('custom_availabilities')
export class CustomAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  date!: string;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @ManyToOne(
    () => DoctorProfile,
    (doctor) => doctor.customAvailabilities,
    {
      onDelete: 'CASCADE',
    },
  )
  doctor!: DoctorProfile;
}