import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function AdminDashboard() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin 👋</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
