import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Request,
  UseGuards,
  Delete,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { AvailabilityService } from './availability.service';

import { UpdateRecurringAvailabilityDto } from './dto/update-recurring-availability.dto';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring-availability.dto';

@Controller('doctor/availability')
export class AvailabilityController {
  constructor(
    private readonly availabilityService: AvailabilityService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Post()
  createAvailability(
    @Request() req: any,
    @Body()
    dto: CreateRecurringAvailabilityDto,
  ) {
    return this.availabilityService.createRecurringAvailability(
      req.user.id,
      dto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @Get()
  getAvailabilities(
    @Request() req: any,
  ) {
    return this.availabilityService.getRecurringAvailabilities(
      req.user.id,
    );
  }
  @ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
@Patch(':id')
updateAvailability(
  @Request() req: any,
  @Param('id') id: string,
  @Body()
  dto: UpdateRecurringAvailabilityDto,
) {
  return this.availabilityService.updateRecurringAvailability(
    req.user.id,
    id,
    dto,
  );
}
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('DOCTOR')
@Delete(':id')
deleteAvailability(
  @Request() req: any,
  @Param('id') id: string,
) {
  return this.availabilityService.deleteRecurringAvailability(
    req.user.id,
    id,
  );
}
}