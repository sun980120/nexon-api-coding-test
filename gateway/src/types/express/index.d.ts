import { ResponseTokenDto } from '../../auth/dtos/response.token.dtos';

declare global {
  namespace Express {
    interface Request {
      user?: ResponseTokenDto;
    }
  }
}
