
import { useState } from "react";
import authService from "../services/authService";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { user } = await authService(email, password);
      onLogin(user);
    } catch (e) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
