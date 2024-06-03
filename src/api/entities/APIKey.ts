import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class APIKey {
  @PrimaryColumn()
  apiKey!: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
}
