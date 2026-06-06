// // import {
// //   Controller,
// //   Get,
// //   Request,
// //   UseGuards,
// // } from '@nestjs/common';

// // import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// // import { RolesGuard } from '../common/guards/roles.guard';
// // import { Roles } from '../common/decorators/roles.decorator';

// // @Controller('doctor')
// // @UseGuards(JwtAuthGuard, RolesGuard)
// // export class DoctorController {
// //   @Get('profile')
// //   @Roles('DOCTOR')
// //   getProfile(@Request() req: any) {
// //     return {
// //       message: 'Doctor profile',
// //       user: req.user,
// //     };
// //   }
// // }

// import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// @Controller('doctor')
// export class DoctorController {
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req: any) {
//     return req.user;
//   }
// }

import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()

@Controller('doctor')
export class DoctorController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}