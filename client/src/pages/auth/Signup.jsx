import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import { axiosInstance } from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';

function Signup({ setCurrentPage }) {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const data = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        profileImageUrl: ""
      });

      if (data.success && data.user) {
        localStorage.setItem("token", data.user.token);
        updateUser(data.user);

        // Clear form
        setFullName("");
        setEmail("");
        setPassword("");
        setProfileImage(null);

        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    }
  };
  return (
    <div className="w-full max-w-md p-8 flex flex-col justify-center animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200 hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🎆</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h3>
        <p className="text-slate-600">Join CrackBano and start your journey</p>
      </div>
      <form onSubmit={handleSignup}>

        <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="John Doe" type="text" />

          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="test@gmail.com" type="text" />

          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 characters" type="password" />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 text-red-400 rounded-lg border border-red-500/30 text-sm">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary">
          <span>✨</span>
          SIGN UP
        </button>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Already have an account?{" "}
          <button className="font-semibold text-teal-600 hover:text-teal-700 transition-all duration-200 hover:scale-105 hover:underline underline-offset-2" onClick={() => setCurrentPage("login")}>Sign In</button>
        </p>
      </form>


    </div>
  )
}

export default Signup
