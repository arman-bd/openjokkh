import { getRepository } from 'typeorm';
import { APIKey } from '../entities/APIKey';

export const isValidApiKey = async (connection: any, apiKey: string): Promise<boolean> => {
  const apiKeyRepository = connection.getRepository(APIKey);
  const result = await apiKeyRepository.findOne({ where: { apiKey } });
  return !!result;
};

export const saveApiKey = async (connection: any, apiKey: string): Promise<void> => {
  const apiKeyRepository = connection.getRepository(APIKey);
  const newApiKey = new APIKey(apiKey);
  await apiKeyRepository.save(newApiKey);
};
