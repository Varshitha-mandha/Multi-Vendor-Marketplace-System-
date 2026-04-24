
import { useState } from "react";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const [user, setUser] = useState(null);
  return user ? <div>Dashboard</div> : <LoginPage onLogin={setUser} />;
}
