import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Contact {
  @Prop({ required: true, minlength: 1 })
  name: string;

  @Prop({ required: true })
  number: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);