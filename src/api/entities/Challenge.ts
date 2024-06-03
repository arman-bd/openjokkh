import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Challenge {
  @PrimaryColumn()
  challengeToken!: string;

  @Column()
  timestamp!: number;

  constructor(challengeToken: string, timestamp: number) {
    this.challengeToken = challengeToken;
    this.timestamp = timestamp;
  }
}
