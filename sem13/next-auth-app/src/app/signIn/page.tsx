'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: '/dashboard',
      redirect: false,
    });
    if (result?.ok) {
      router.push('/dashboard');
    }
  };

  const handleGithubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' });
  };

  const handleCredentials = async () => {
    setError('');
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      name,
      isRegister: isRegister.toString(),
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push('/dashboard');
    } else {
      setError(result?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          {isRegister ? 'Registrarse' : 'Sign In'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {isRegister && (
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:border-blue-500"
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mb-3 text-sm focus:outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleCredentials}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mb-3 text-sm disabled:opacity-50"
        >
          {loading ? 'Cargando...' : isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>

        <button
          onClick={() => { setIsRegister(!isRegister); setError(''); }}
          className="w-full text-blue-600 text-sm mb-4 hover:underline"
        >
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-xs">o continúa con</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-black transition flex items-center justify-center gap-2 mb-3"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <button
          onClick={handleGithubSignIn}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition flex items-center justify-center gap-2"
        >
          <FaGithub />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}