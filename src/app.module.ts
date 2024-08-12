import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import AuthModule from './auth/auth.module';
import ContactsModule from './contacts/contacts.module';
import env from './helpers/env';

const DB_PATH = env('MONGODB_DB');
const DB_USER = env('MONGODB_USER');
const DB_PASSWORD = env('MONGODB_PASSWORD');
const DB_URL = env('MONGODB_URL');

const URI = `${DB_PATH}${DB_USER}:${DB_PASSWORD}${DB_URL}`;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({ pinoHttp: { transport: { target: 'pino-pretty' } } }),
    MongooseModule.forRoot(URI),
    ContactsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
