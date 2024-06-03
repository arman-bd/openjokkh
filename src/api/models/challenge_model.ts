import { getRepository } from 'typeorm';
import { Challenge } from '../entities/Challenge';

const expirationTime = 180;

export const storeSolvedChallenge = async (connection: any, challengeToken: string): Promise<void> => {
  const challengeRepository = connection.getRepository(Challenge);
  const timestamp = Math.floor(Date.now() / 1000);
  const newChallenge = new Challenge(challengeToken, timestamp);
  await challengeRepository.save(newChallenge);
  cleanupOldChallenges(connection);
};

export const isSolvedChallenge = async (connection: any, challengeToken: string): Promise<boolean> => {
  const challengeRepository = connection.getRepository(Challenge);
  const result = await challengeRepository.findOne({ where: { challengeToken } });
  return !!result;
};

export const cleanupOldChallenges = async (connection: any): Promise<void> => {
  const challengeRepository = connection.getRepository(Challenge);
  const currentTime = Math.floor(Date.now() / 1000);
  await challengeRepository.createQueryBuilder()
    .delete()
    .from(Challenge)
    .where("timestamp < :time", { time: currentTime - expirationTime })
    .execute();
};
