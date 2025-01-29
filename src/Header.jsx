import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { generatePDF } from './CVPreview';

export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [cvInfo, setCvInfo] = useState(null);

  useEffect(() => {
    /*     const fetchData = async()=>{
          try {
            const res = await fetch("https://grateful-meerkat-awake.ngrok-free.app/html/api.php/CV")
            const result = await res.text();
            console.log(result);
          } catch (error) {
            console.log('error')
          }
        }
        fetchData(); */
    fetch("https://grateful-meerkat-awake.ngrok-free.app/html/api.php/CV", { method: 'GET', headers: { 'ngrok-skip-browser-warning': 'true' } })
      .then((res) => res.json())
      .then((data) => setCvInfo(data))
      .catch((err) => console.error("Error fetching CV Info:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have been logged out.');
    navigate('/auth');
  };

  const handleDownloadPDF = () => {
    if (!cvInfo) {
      alert('Loading CV data. Please try again in a moment.');
      return;
    }
    generatePDF(cvInfo);
  };

  return (
    <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl border border-purple-200 py-4 px-8 border-b border-purple-200 mb-7">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800">ALEXIA RUEDA</h1>

        <nav className="flex space-x-4">
          <Link
            to="/"
            className="font-bold bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            CV
          </Link>
          <Link
            to="/auth"
            className="font-bold bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            UPDATE CV
          </Link>

          <button
            onClick={handleDownloadPDF}
            className="font-bold bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            DOWNLOAD CV
          </button>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="relative group bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center hover:bg-red-700 transition duration-300"
            >
              <LogOut />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
