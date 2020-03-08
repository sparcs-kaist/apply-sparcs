import * as jwt from 'jsonwebtoken';

const generateJWT = (payload: object, subject: string): any => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    issuer: 'apply.sparcs.org',
    expiresIn: 60 * 60 * 24,
    subject,
  });
};

const validateJWT = (token: string): any => {
  try {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    return null;
  }
};

export { generateJWT, validateJWT };
