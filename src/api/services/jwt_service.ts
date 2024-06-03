import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as challengeModel from '../models/challenge_model';
import { generateJSChallenge } from './js_challenge_service'; // Import the JS challenge generator

const secretKey = 'your-secret-key';
const expirationTime = '180s';

export const generateChallengeToken = () => {
  const { challenge, solution } = generateJSChallenge();
  const hash = crypto.createHash('sha256').update(solution).digest('hex');
  const token = jwt.sign({ challenge, hash }, secretKey, { expiresIn: expirationTime });
  return token;
};

export const verifyChallengeToken = async (connection: any, token: string, solution: string): Promise<boolean> => {
  try {
    const decoded: any = jwt.verify(token, secretKey);
    const expectedHash = crypto.createHash('sha256').update(solution).digest('hex');
    const isValid = decoded.hash === expectedHash;
    const isSolved = await challengeModel.isSolvedChallenge(connection, token);
    if (isValid && !isSolved) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
