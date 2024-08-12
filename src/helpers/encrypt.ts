import * as bcrypt from 'bcrypt';
import { SALT } from 'src/constants';

const encrypt = async (valueToEncrypt: string) => {
  return bcrypt.hash(valueToEncrypt, SALT);
};

export default encrypt;
