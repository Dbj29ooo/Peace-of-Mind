// Modify the interface with any CRUD methods you might need

export interface IStorage {
  // Storage methods go here
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage
  }
}

export const storage = new MemStorage();
