import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateContactDto, UpdateContactDto } from './contacts.dto';
import { Contact } from './schemas/contact.schema';

@Injectable()
class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}
  async findOne(filter: { [x: string]: string | ObjectId }) {
    return this.contactModel.findOne(filter);
  }
  async getAll(owner: ObjectId) {
    return this.contactModel.find({ owner });
  }
  async create(payload: CreateContactDto) {
    return this.contactModel.create(payload);
  }
  async updateById({ contactId, ...payload }: UpdateContactDto & { contactId: ObjectId }) {
    return this.contactModel.findByIdAndUpdate(contactId, payload, { new: true });
  }
  async deleteById(contactId: ObjectId) {
    return this.contactModel.findByIdAndDelete(contactId);
  }
}

export default ContactsService;
