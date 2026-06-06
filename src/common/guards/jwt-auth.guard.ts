// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}

// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   handleRequest(err, user, info) {
//     console.log('JWT GUARD =>', { err, user, info });
//     return user;
//   }
// }

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: any,
  ) {
    console.log('JWT GUARD =>', {
      err,
      user,
      info,
    });

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}