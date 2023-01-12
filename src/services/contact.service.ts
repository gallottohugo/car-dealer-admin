import { Contact } from '@prisma/client';
import { ContactRepository } from '../repositories/contact.repository';

export class ContactService {

  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }
  
  async findByDealer(dealerId: number): Promise<Array<Contact>> {
    return await this.contactRepository.findByDealer(dealerId)
  }

  async find(id: number): Promise<Contact | null> {
    return await this.contactRepository.find(id);
  }

  async create(resource: Contact): Promise<Contact>{
    return await this.contactRepository.create(resource);
  }
}
