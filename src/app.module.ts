import { Module } from '@nestjs/common';
import { MailsModule } from './mails/mails.module';
import { ProxyModule } from './common/proxy/proxy.module';

@Module({
  imports: [MailsModule, ProxyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
