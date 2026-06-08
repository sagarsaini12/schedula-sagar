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

import { DoctorService } from './doctor.service';

import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@ApiBearerAuth()
@Controller('doctor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  @Post('profile')
  createProfile(
    @Request() req: any,
    @Body() dto: CreateDoctorProfileDto,
  ) {
    return this.doctorService.createProfile(
      req.user.id,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.doctorService.getProfile(
      req.user.id,
    );
  }

  @Patch('profile')
  updateProfile(
    @Request() req: any,
    @Body() dto: UpdateDoctorProfileDto,
  ) {
    return this.doctorService.updateProfile(
      req.user.id,
      dto,
    );
  }
}