const bcrypt = require('bcryptjs');

const generatePassword = length => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789íłŁ$ß¤×÷€äđĐÄ@><&#';
  let retVal = '';
  for (let i = 0; i < length; i += 1) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return retVal;
};

const hashPassword = async password => await bcrypt.hash(password, 10);
/**
 * compare the stored and the incomming password
 * @param {} incommingPassword
 * @param {*} storedPassword
 */
const comparePassword = async (incommingPassword, storedPassword) =>
  await bcrypt.compare(incommingPassword, storedPassword);

module.exports = { hashPassword, generatePassword, comparePassword };
