import * as jwtService from './jwt_service';
import * as apiKeyModel from '../models/api_key_model';
import * as challengeModel from '../models/challenge_model';

export const validateCaptcha = async (connection: any, apiKey: string, challengeToken: string, captchaResponse: string, solution: string): Promise<boolean> => {
  const isApiKeyValid = await apiKeyModel.isValidApiKey(connection, apiKey);
  const isChallengeValid = await jwtService.verifyChallengeToken(connection, challengeToken, solution);
  const isCaptchaResponseValid = captchaResponse === 'checkbox_clicked';

  if (isApiKeyValid && isChallengeValid && isCaptchaResponseValid) {
    await challengeModel.storeSolvedChallenge(connection, challengeToken);
    return true;
  }

  return false;
};
