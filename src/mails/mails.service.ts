import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Challenge } from 'src/common/interfaces/challenge.interface';
import { Player } from 'src/common/interfaces/player.interface';
import { ProxyService } from 'src/common/proxy/proxy.service';

@Injectable()
export class MailsService {
  private proxyService: ClientProxy;

  constructor(
    private readonly mailerService: MailerService,
    proxyService: ProxyService,
  ) {
    this.proxyService = proxyService.getClientAdmin();
  }

  async send(challenge: Challenge) {
    const playerId: string = challenge.players.find(
      (item) => item !== challenge.requester,
    );

    const [challenged, requester]: Player[] = await Promise.all([
      firstValueFrom(this.proxyService.send('get-player', playerId)),
      firstValueFrom(this.proxyService.send('get-player', challenge.requester)),
    ]);

    this.mailerService.sendMail({
      to: challenged.email,
      subject: 'Notificação de Desafio',
      template: 'notification',
      context: {
        name: challenged.name,
        requesterName: requester.name,
        requesterMail: requester.email,
      },
    });
  }
}
