import { JwtService } from '@nestjs/jwt';

const generateJwtToken = async <T extends {}>(jwtService: JwtService, payload: T) =>
  jwtService.signAsync(payload);

export default generateJwtToken;
