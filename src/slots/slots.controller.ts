import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';

import { SlotsService } from './slots.service';

import { GetDoctorSlotsDto } from './dto/get-doctor-slots.dto';

@Controller('doctor')
export class SlotsController {
  constructor(
    private readonly slotsService: SlotsService,
  ) {}

  @Get(':doctorId/slots')
  getDoctorSlots(
    @Param('doctorId') doctorId: string,
    @Query() query: GetDoctorSlotsDto,
  ) {
    return this.slotsService.getDoctorSlots(
      doctorId,
      query,
    );
  }
}