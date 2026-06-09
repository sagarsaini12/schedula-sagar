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
}