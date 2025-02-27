import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('email');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 5) {
      setOtp(value);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOTP = () => {
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setStage('otp');
      toast.success('OTP sent successfully to your email!');
    }, 1500);
  };

  const handleLogin = () => {
    if (otp === '00000') {
      setIsAnimating(true);
      setTimeout(() => {
        toast.success('Login Successful!');
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/20 to-slate-900" />
        <div className="absolute w-full h-full -top-40 -right-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-full h-full -bottom-40 -left-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="min-h-screen flex items-center justify-center relative">
        <div className={`w-full max-w-md relative ${isAnimating ? 'animate-pulse' : ''}`}>
          <div className="relative bg-slate-800/90 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-slate-700">
            <div className="p-4 flex items-center justify-center border-b border-slate-700">
              <span className="text-4xl font-bold bg-gradient-to-r from-slate-200 to-cyan-300 bg-clip-text text-transparent">
                WorkNest
              </span>
            </div>

            <div className="p-8">
              {stage === 'email' ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-200">Welcome Back</h2>
                    <p className="text-slate-400">Enter your email address to continue</p>
                  </div>

                  <div className="relative group">
                    <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 
                      bg-gradient-to-r from-slate-700 to-slate-600 blur-xl
                      ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                    </div>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
                        ${isTyping ? 'text-cyan-300' : 'text-slate-400'}`}>
                        <Mail size={20} />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-800/90 rounded-lg
                          border border-slate-700 transition-all duration-300
                          text-slate-200 placeholder-slate-500
                          focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOTP}
                    className="w-full py-4 rounded-lg font-semibold text-slate-200
                      transition-all duration-300 bg-slate-700 hover:bg-slate-600
                      flex items-center justify-center gap-2"
                  >
                    Send OTP
                    <Send size={18} className="animate-bounce" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-slate-200">Verify OTP</h2>
                    <p className="text-slate-400">Enter the 5-digit code sent to {email}</p>
                  </div>

                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={5}
                    className="w-full text-center text-3xl tracking-[0.5em] py-4 
                      bg-slate-800/90 rounded-lg border border-slate-700
                      focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20
                      transition-all duration-300 text-slate-200 placeholder-slate-600"
                    placeholder="_ _ _ _ _"
                  />

                  <div className="flex justify-between text-sm">
                    <button 
                      onClick={() => setStage('email')}
                      className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 
                        transition-all duration-300"
                    >
                      <ArrowLeft size={16} /> Change Email
                    </button>
                    <button 
                      onClick={handleSendOTP}
                      className="text-cyan-300 hover:text-cyan-200 transition-all duration-300"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full py-4 rounded-lg font-semibold text-slate-200
                      transition-all duration-300 bg-slate-700 hover:bg-slate-600
                      flex items-center justify-center gap-2"
                  >
                    Verify & Login
                    <CheckCircle2 size={18} className="animate-pulse" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;