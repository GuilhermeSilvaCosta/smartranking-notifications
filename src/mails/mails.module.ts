import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
          user: '001be80cb9ca96',
          pass: '33e681ae350393',
        },
      },
    }),
    ProxyModule,
  ],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}
