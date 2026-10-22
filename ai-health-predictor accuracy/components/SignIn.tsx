import React, { useState } from 'react';
import Button from './common/Button';
import Card from './common/Card';
import Input from './common/Input';

interface SignInProps {
  onLoginSuccess: () => void;
  onNavigateToSignUp: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onLoginSuccess, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setError('Please enter both email and password.');
      return;
    }
    // This is a mock sign-in. In a real app, you'd verify credentials.
    setError('');
    onLoginSuccess();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-blue-900/50 p-4">
      <Card className="max-w-md w-full">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">AI Health Predictor</h1>
            <p className="text-slate-400">Sign in to access your health dashboard.</p>
          </div>
          <form onSubmit={handleSignIn} className="space-y-6">
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
                Sign In
              </Button>
              <p className="text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <button type="button" onClick={onNavigateToSignUp} className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none">
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;