import React, { useState, useCallback } from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';

enum AuthState {
  SIGN_UP,
  SIGN_IN,
  AUTHENTICATED,
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SIGN_UP);

  const handleLoginSuccess = useCallback(() => {
    setAuthState(AuthState.AUTHENTICATED);
  }, []);
  
  const handleLogout = useCallback(() => {
    setAuthState(AuthState.SIGN_IN);
  }, []);

  const handleSignUpSuccess = useCallback(() => {
    // Navigate directly to Dashboard after a successful sign-up
    setAuthState(AuthState.AUTHENTICATED);
  }, []);

  const navigateToSignIn = useCallback(() => {
    setAuthState(AuthState.SIGN_IN);
  }, []);

  const navigateToSignUp = useCallback(() => {
    setAuthState(AuthState.SIGN_UP);
  }, []);
  
  const renderContent = () => {
    switch (authState) {
      case AuthState.SIGN_UP:
        return <SignUp onSignUpSuccess={handleSignUpSuccess} onNavigateToSignIn={navigateToSignIn} />;
      case AuthState.SIGN_IN:
        return <SignIn onLoginSuccess={handleLoginSuccess} onNavigateToSignUp={navigateToSignUp} />;
      case AuthState.AUTHENTICATED:
        return <Dashboard onLogout={handleLogout} />;
      default:
        return <SignUp onSignUpSuccess={handleSignUpSuccess} onNavigateToSignIn={navigateToSignIn} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {renderContent()}
    </div>
  );
};

export default App;