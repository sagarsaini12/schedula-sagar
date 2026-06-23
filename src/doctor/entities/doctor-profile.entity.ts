import { OneToMany } from 'typeorm';

import { RecurringAvailability } from '../availability/entities/recurring-availability.entity';
import { CustomAvailability } from '../availability/entities/custom-availability.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/user.entity';

@Entity('doctor_profiles')
export class DoctorProfile {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fullName!: string;

  @Column()
  specialization!: string;

  @Column()
  experience!: number;

  @Column()
  qualification!: string;

  @Column('decimal')
  consultationFee!: number;

  @Column()
  availabilityHours!: string;

  @Column({
  default: true,
})
availabilityStatus!: boolean;

  @Column({ nullable: true })
  profileDetails!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;

@OneToMany(
  () => RecurringAvailability,
  (availability) => availability.doctor,
)
recurringAvailabilities!: RecurringAvailability[];

@OneToMany(
  () => CustomAvailability,
  (availability) => availability.doctor,
)
customAvailabilities!: CustomAvailability[];

}