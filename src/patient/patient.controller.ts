import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiBearerAuth()
@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientController {
  @Get('profile')
@Roles('PATIENT')
getProfile(@Request() req: any) {
  console.log('PATIENT PROFILE USER =>', req.user);

  return {
    message: 'Patient profile',
    user: req.user,
  };
}
}

