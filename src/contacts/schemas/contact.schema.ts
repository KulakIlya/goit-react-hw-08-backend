import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, ObjectId } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Contact {
  @Prop({ required: true, minlength: 1 })
  name: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true, type: MongooseSchema.ObjectId, ref: 'Users' })
  owner: ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

ContactSchema.methods.toJSON = function () {
  const contact = this.toObject();

  const id = contact._id;

  delete contact.owner;
  delete contact._id;

  contact.id = id;

  return contact;
};
