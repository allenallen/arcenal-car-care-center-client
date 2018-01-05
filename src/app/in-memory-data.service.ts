import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 2, name: 'Edward' },
      { id: 3, name: 'E' },
      { id: 4, name: 'Ed' },
      { id: 5, name: 'Edw' }
    ];
    return {customers};
  }

  constructor() { }

}
