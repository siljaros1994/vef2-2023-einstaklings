import bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

(async () => {
  const password1 = 'password123';
  const password2 = 'password456';

  const hashedPassword1 = await hashPassword(password1);
  const hashedPassword2 = await hashPassword(password2);

  console.log(`Hashed password for '${password1}': ${hashedPassword1}`);
  console.log(`Hashed password for '${password2}': ${hashedPassword2}`);
})();