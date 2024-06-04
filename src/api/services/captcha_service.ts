import * as jwtService from './jwt_service';
import * as apiKeyModel from '../models/api_key_model';
import * as challengeModel from '../models/challenge_model';

// Sample function to check if movements are natural
function analyzeMouseMovements(movements: Array<{x: number, y: number, timestamp: number, velocity: number}>): boolean {
  if (movements.length < 2) return false; // Not enough data

  let irregularMovements = 0;
  let lastMovement = movements[0];

  // Check for natural pauses and velocity changes
  for (let i = 1; i < movements.length; i++) {
      const movement = movements[i];
      const timeDiff = movement.timestamp - lastMovement.timestamp;
      const velocityChange = Math.abs(movement.velocity - lastMovement.velocity);

      // Assume pauses and rapid velocity changes are more likely in human movements
      if (timeDiff > 100 && velocityChange > 0.5) irregularMovements++;

      lastMovement = movement;
  }
  
  // Check if a significant portion of movements are 'irregular'
  return (irregularMovements / movements.length) < 0.3;
}

export const validateCaptcha = async (connection: any, apiKey: string, challengeToken: string, captchaResponse: string, solution: string, mouseMovementData: string): Promise<boolean> => {
  const isApiKeyValid = await apiKeyModel.isValidApiKey(connection, apiKey);
  const isChallengeValid = await jwtService.verifyChallengeToken(connection, challengeToken, solution);
  const isCaptchaResponseValid = captchaResponse === 'checkbox_clicked';
  const movements = JSON.parse(mouseMovementData);
  const isMouseMovementNatural = analyzeMouseMovements(movements);

  if (isApiKeyValid && isChallengeValid && isCaptchaResponseValid && isMouseMovementNatural) {
    await challengeModel.storeSolvedChallenge(connection, challengeToken);
    return true;
  }

  return false;
};
