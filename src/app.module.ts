import { Module } from '@nestjs/common';
import { MailsModule } from './mails/mails.module';
import { ProxyModule } from './common/proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MailsModule, ProxyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
