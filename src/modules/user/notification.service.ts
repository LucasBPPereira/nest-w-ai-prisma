import { Injectable } from '@nestjs/common';
import { User } from './domain/user.entity';
import { Book } from '../book/domain/book.domain';
import { sendMail } from 'src/config/email/sendEmail';

@Injectable()
export class NotificationService {
  public async sendWelcomeEmail(user: User, iaText?: string) {
    await sendMail({
      to: user.email,
      subject: 'Bem-vindo à nossa livraria!',
      text: `Olá, ${user.name}! Seja bem-vindo.`,
      html: `${iaText}`,
    });
  }
  public async sendPromotionEmail(
    email: string,
    promoDetails: { title: string; description: string },
  ) {
    await sendMail({
      to: email,
      subject: promoDetails.title,
      text: promoDetails.description,
      html: `<h2>${promoDetails.title}</h2><p>${promoDetails.description}</p>`,
    });
  }

  public async sendNewReleaseNotification(book: Book, emails: string[]) {
    for (const email of emails) {
      await sendMail({
        to: email,
        subject: `Novo lançamento: ${book.title}`,
        text: `Acabamos de lançar o livro "${book.title}"!`,
        html: `<p>Conheça nosso novo livro: <strong>${book.title}</strong> por ${book.author}</p>`,
      });
    }
  }
}
