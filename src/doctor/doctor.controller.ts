import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
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
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  // =========================
  // DAY 4 APIs
  // =========================

  @Get()
  getDoctors(
    @Query() query: GetDoctorsQueryDto,
  ) {
    return this.doctorService.getDoctors(query);
  }

  // =========================
  // DAY 3 APIs
  // =========================

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.doctorService.getProfile(
      req.user.id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
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

  // =========================
  // DAY 4 Doctor Details API
  // =========================
@Get('details/:id')
getDoctorById(
  @Param('id') id: string,
) {
  return this.doctorService.getDoctorById(id);
}
}