import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthForms() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (token && rol === 'admin') {
      navigate('/admin'); 
    }
  }, []);

  const API_URL = 'http://172.17.22.170/html/api.php';

  //maneja los cambios en los inputs
  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  //maneja el submit del login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('rol', result.rol);
        if (result.rol === 'admin') {
          alert('Login successful!');
          navigate('/admin'); 
        } else {
          alert('Login successful, but you are not an admin.');
        }
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred during login');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null);
  
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData), //registerData contiene email y password
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Registration successful! You can now log in.');
        setRegisterData({ email: '', password: '' });
      } else {
        setRegisterError(result.error || 'Registration failed');
      }
    } catch (error) {
      setRegisterError('An error occurred during registration');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="bg-white flex justify-center items-center p-8 rounded-xl shadow-lg border border-purple-200">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-purple-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => handleInputChange(e, setLoginData)}
                  className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => handleInputChange(e, setLoginData)}
                  className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="font-bold w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                LOGIN
              </button>
              {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
            </form>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-200">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">Register</h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
  <div>
    <label className="block text-purple-700 mb-1">Email</label>
    <input
      type="email"
      value={registerData.email}
      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
      className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
  </div>

  <div className="flex space-x-4">
    <div className="flex-1">
      <label className="block text-purple-700 mb-1">Password</label>
      <input
        type="password"
        value={registerData.password}
        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>

    <div className="flex-1">
      <label className="block text-purple-700 mb-1">Confirm Password</label>
      <input
        type="password"
        value={registerData.confirmPassword}
        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
        className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  </div>

  <button
    type="submit"
    className="font-bold w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
  >
    REGISTER
  </button>

  {registerError && (
    <p className="text-red-500 mt-2">{registerError}</p>
  )}
</form>
        </div>
      </div>
    </div>
  );
}
