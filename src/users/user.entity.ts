import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

import { DoctorProfile } from '../doctor/entities/doctor-profile.entity';
import { PatientProfile } from '../patient/entities/patient-profile.entity';

export enum Role {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PATIENT,
  })
  role!: Role;

  @OneToOne(
    () => DoctorProfile,
    (doctorProfile) => doctorProfile.user,
  )
  doctorProfile!: DoctorProfile;

  @OneToOne(
    () => PatientProfile,
    (patientProfile) => patientProfile.user,
  )
  patientProfile!: PatientProfile;

  @CreateDateColumn()
  createdAt!: Date;
}