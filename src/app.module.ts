import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
        
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sagar',
      database: 'schedula',
      entities: [
  User,
  DoctorProfile,
  PatientProfile,
],
synchronize: true,
    }),

    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
  ],
})
export class AppModule {}