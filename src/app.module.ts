import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecurringAvailability } from './doctor/availability/entities/recurring-availability.entity';
import { CustomAvailability } from './doctor/availability/entities/custom-availability.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppController } from './app.controller';


import { User } from './users/user.entity';
import { DoctorProfile } from './doctor/entities/doctor-profile.entity';
import { PatientProfile } from './patient/entities/patient-profile.entity';

@Module({
  controllers: [AppController],

  imports: [
    ConfigModule.forRoot({
  isGlobal: true,
}),
    TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
  User,
  DoctorProfile,
  PatientProfile,
  RecurringAvailability,
  CustomAvailability,
],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
}),

    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
  ],

  
})


export class AppModule {}