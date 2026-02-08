import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import SuccessCard from "../../components/success"
import {useNavigate} from "react-router-dom"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading,setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      // alert("Admin logged in successfully");
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setTimeout(() => {
          navigate("/Admin")
        }, 2500);
      }, 2000);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#020617] px-4">
      {success ? (
        <SuccessCard />
      ) : (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-amber-400 mb-2">
            Admin Login
          </h2>
          <p className="text-center text-sm text-gray-400 mb-6">
            Login to manage trips & feedback
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 rounded-lg bg-black/40 border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 rounded-lg bg-black/40 border border-white/10 px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500">
            © AjnaaBee Trip · Admin Panel
          </p>
        </div>
      )}
    </div>
  );
}
