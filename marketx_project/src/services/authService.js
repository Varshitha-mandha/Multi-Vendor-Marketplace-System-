
import { MOCK_USERS } from "../data/users";

export default function authService(email, password) {
  return new Promise((resolve, reject) => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) reject();
    else resolve({ user });
  });
}
