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
  Req,
  UseGuards,
} from '@nestjs/common';

import { ObjectId } from 'mongoose';
import { IsObjectIdPipe } from 'nestjs-object-id';
import AuthGuard from 'src/core/auth.guard';
import { AuthRequest } from 'src/core/auth.types';
import { CreateContactDto, UpdateContactDto } from './contacts.dto';
import ContactsService from './contacts.service';

@Controller('contacts')
class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getContacts(@Req() req: AuthRequest) {
    return {
      message: 'Successfully found contacts!',
      data: await this.contactsService.getAll(req.user.sub),
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createContact(@Req() req: AuthRequest, @Body() body: CreateContactDto) {
    const payload = { ...body, owner: req.user.sub };
    return {
      message: 'Contact has been created!',
      data: await this.contactsService.create(payload),
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':contactId')
  async updateContact(
    @Req() req: AuthRequest,
    @Param('contactId', IsObjectIdPipe) contactId: ObjectId,
    @Body() body: UpdateContactDto
  ) {
    const contact = await this.contactsService.findOne({ _id: contactId, owner: req.user.sub });
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
  @UseGuards(AuthGuard)
  @Delete(':contactId')
  async deleteContact(
    @Req() req: AuthRequest,
    @Param('contactId', IsObjectIdPipe) contactId: ObjectId
  ) {
    const contact = await this.contactsService.findOne({ _id: contactId, owner: req.user.sub });
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
