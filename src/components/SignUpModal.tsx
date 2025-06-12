"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface SignUpModalProps {
  children: React.ReactNode;
}

export default function SignUpModal({ children }: SignUpModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle auth redirect
  useEffect(() => {
    // Check if we have a hash in the URL (auth redirect)
    if (window.location.hash) {
      // Get the access token from the URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      if (hashParams.get('access_token')) {
        // Clear the hash from the URL
        window.history.replaceState(null, '', window.location.pathname);
        // Close the modal
        setIsOpen(false);
      }
    }
  }, []);

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowPasswordForm(true);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}`
        }
      });

      if (error) throw error;

      if (data) {
        alert('Check your email for the confirmation link!');
        setIsOpen(false);
        setEmail('');
        setPassword('');
        setShowPasswordForm(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (!isOpen) {
    return (
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-[32px] bg-[#1E0044] p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Flowweave"
            width={100}
            height={100}
            className="mb-6"
          />

          {!showPasswordForm ? (
            <>
              {/* OAuth Buttons */}
              <button
                onClick={handleGoogleSignUp}
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#2A1B3D] px-6 py-4 text-[1rem] font-normal text-white/90 transition-all hover:bg-[#2A1B3D]/80"
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative mb-6 w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#1E0044] px-4 text-[1rem] text-white/60">or</span>
                </div>
              </div>

              {/* Email Input */}
              <form onSubmit={handleEmailContinue} className="w-full">
                <div className="relative mb-4">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <svg className="h-5 w-5 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-full bg-[#2A1B3D] px-12 py-4 text-[1rem] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#6366F1] px-6 py-4 text-[1rem] font-normal text-white transition-all hover:bg-[#6366F1]/90"
                >
                  Continue with email
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleSignUp} className="w-full">
              <div className="relative mb-4">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-5 w-5 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-full bg-[#2A1B3D] px-12 py-4 text-[1rem] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#6366F1] px-6 py-4 text-[1rem] font-normal text-white transition-all hover:bg-[#6366F1]/90 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="mt-4 text-[1rem] text-white/60 hover:text-white"
              >
                Back to sign up options
              </button>
            </form>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 