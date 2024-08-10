import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ObjectId } from 'mongoose';
import { IsObjectIdPipe } from 'nestjs-object-id';
import { CreateContactDto, UpdateContactDto } from './contacts.dto';
import ContactsService from './contacts.service';

@Controller('contacts')
class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async getContacts() {
    return {
      message: 'Successfully found contacts!',
      data: await this.contactsService.getAll(),
    };
  }
  @Post()
  async createContact(@Body() body: CreateContactDto) {
    return {
      message: 'Contact has been created!',
      data: await this.contactsService.create(body),
    };
  }
  @Patch(':contactId')
  async updateContact(
    @Param('contactId', IsObjectIdPipe) contactId: ObjectId,
    @Body() body: UpdateContactDto
  ) {
    const contact = await this.contactsService.findOne({ _id: contactId });
    if (!contact)
      throw new HttpException(
        { message: `Contact with id: ${contactId} not found` },
        HttpStatus.NOT_FOUND
      );

    return {
      message: 'Contact has been updated!',
      data: await this.contactsService.updateById({ contactId, ...body }),
    };
  }
  @Delete(':contactId')
  async deleteContact(@Param('contactId', IsObjectIdPipe) contactId: ObjectId) {
    const contact = await this.contactsService.findOne({ _id: contactId });
    if (!contact)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: `Contact with id: ${contactId} not found` },
        HttpStatus.NOT_FOUND
      );

    return {
      message: 'Contact has been deleted!',
      data: await this.contactsService.deleteById(contactId),
    };
  }
}

export default ContactsController;