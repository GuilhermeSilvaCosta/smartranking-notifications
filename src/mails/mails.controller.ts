import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Challenge } from 'src/common/interfaces/challenge.interface';
import { MailsService } from './mails.service';

@Controller('mails')
export class MailsController {
  private readonly logger = new Logger(MailsController.name);

  constructor(private readonly mailsService: MailsService) {}

  @EventPattern('notify-new-challenge')
  notifyNewChallenge(@Payload() challenge: Challenge) {
    this.logger.log(`notify-new-challenge ${JSON.stringify(challenge)}`);
    this.mailsService.send(challenge);
  }
}
