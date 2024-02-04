import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config'

type JwtPayload = {
    sub: string;
    name: string;
  };
  
  @Injectable()
  export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'PlbOjda1lv8lfldMLVUyln+27pJk/BqHNbMew3b3JE+pUUAWn0oSAlAzu5H2nGI2wSkiwG9p2zEWjKYLWRA+kGUMYtFW1l2JSo2U3T/Sj5RTruwNV1FoCJStJkeuBc1shs5h+vED9nXMa1O1jDFB7rYJ+2MxnraEJefrqFwIoyDUnmpYs3VflfX5X1LsNBaqY4NdNZBYlXWGjLrywb5K6U1kPWeyimUuLVVrCDBdUu57nvs558kwkSiW3WAMfLvdmlFdbtdgiOLN7WETXya0CPHvCha7kJi9PPg/AAquUhxcTdYFNNQNU8QvEsVP18iCDHJ0ciLhaRmnN8ismUx+6g==',
      });
    }
  
    validate(payload: JwtPayload) {
      return payload;
    }
  }
  