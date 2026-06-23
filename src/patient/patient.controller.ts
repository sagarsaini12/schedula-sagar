import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

import { PatientService } from './patient.service';

import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@ApiBearerAuth()
@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PATIENT')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Post('profile')
  createProfile(
    @Request() req: any,
    @Body() dto: CreatePatientProfileDto,
  ) {
    return this.patientService.createProfile(
      req.user.id,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.patientService.getProfile(
      req.user.id,
    );
  }

  @Patch('profile')
  updateProfile(
    @Request() req: any,
    @Body() dto: UpdatePatientProfileDto,
  ) {
    return this.patientService.updateProfile(
      req.user.id,
      dto,
    );
  }
}