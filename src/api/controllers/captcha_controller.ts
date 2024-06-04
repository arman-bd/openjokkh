import { Request, Response } from 'express';
import * as captchaService from '../services/captcha_service';
import * as jwtService from '../services/jwt_service';

export const validateCaptcha = async (req: Request, res: Response): Promise<void> => {
  const { apiKey, challengeToken, captchaResponse, solution, mouseMovementData } = req.body;
  const isValid = await captchaService.validateCaptcha(req.app.locals.connection, apiKey, challengeToken, captchaResponse, solution, mouseMovementData);
  if (isValid) {
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
};

export const getChallenge = (req: Request, res: Response): void => {
  const challengeToken = jwtService.generateChallengeToken();
  res.status(200).send({ challengeToken });
};
