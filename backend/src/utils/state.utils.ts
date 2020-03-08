import * as bcrypt from 'bcrypt';

const stateEncryptor = async (state: string) => {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(state, salt);

  return hashed;
};

const stateValidator = async (encryptedState: string, state: string) => {
  const res = await bcrypt.compare(state, encryptedState);

  return res;
};

export { stateEncryptor, stateValidator };
