import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import 'dotenv/config'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'PlbOjda1lv8lfldMLVUyln+27pJk/BqHNbMew3b3JE+pUUAWn0oSAlAzu5H2nGI2wSkiwG9p2zEWjKYLWRA+kGUMYtFW1l2JSo2U3T/Sj5RTruwNV1FoCJStJkeuBc1shs5h+vED9nXMa1O1jDFB7rYJ+2MxnraEJefrqFwIoyDUnmpYs3VflfX5X1LsNBaqY4NdNZBYlXWGjLrywb5K6U1kPWeyimUuLVVrCDBdUu57nvs558kwkSiW3WAMfLvdmlFdbtdgiOLN7WETXya0CPHvCha7kJi9PPg/AAquUhxcTdYFNNQNU8QvEsVP18iCDHJ0ciLhaRmnN8ismUx+6g==',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
