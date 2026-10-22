import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Input from './common/Input';

interface SignUpProps {
  onSignUpSuccess: () => void;
  onNavigateToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess, onNavigateToSignIn }) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || mobileNumber.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields.');
      return;
    }
     if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    // This is a mock sign-up. In a real app, you'd save user credentials.
    setError('');
    onSignUpSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900/50 p-4">
      <Card className="max-w-md w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-slate-400">Join AI Health Predictor today.</p>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
            <Input
              id="name"
              type="text"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
            <Input
              id="mobile"
              type="tel"
              label="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="123-456-7890"
            />
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="space-y-4 pt-2">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <button type="button" onClick={onNavigateToSignIn} className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none">
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
