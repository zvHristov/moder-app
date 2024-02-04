import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
  })
export class User {
    @Prop({
        type: String,
        unique: true,
        default: function genUUID() {
          return uuid();
        },
      })
    userId: string;
    @Prop({required:true})
    name: string;
    @Prop({required:true})
    email: string;
    @Prop({required:true})
    password: string;
    @Prop()
    refreshToken: string;  
    @Prop({default: Date.now() })
    createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
