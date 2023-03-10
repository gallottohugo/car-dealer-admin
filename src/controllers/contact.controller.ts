import { Contact } from '@prisma/client';
import { ContactService } from '../services/contact.service';

export class ContactController {
  private contactService: ContactService
  constructor() {
    this.contactService = new ContactService();
  }

  async findByDealer(delaerId: number): Promise<Array<Contact>>  {
    return await this.contactService.findByDealer(delaerId)
  }
}
