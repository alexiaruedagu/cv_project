'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

export function Admin() {
  const navigate = useNavigate();
  const [cvInfo, setCvInfo] = useState(null);
  const [cvEducation, setCvEducation] = useState([]);
  const [cvExperience, setCvExperience] = useState([]);
  const [newEducation, setNewEducation] = useState({ school: '', study: '', period: '' });
  const [newExperience, setNewExperience] = useState({ job: '', type: '', experience: '', description: '' });
  const [updatedInfo, setUpdatedInfo] = useState({ name: '', profession: '', experience: '', email: '', phone: '', ubication: '' });

  const API_URL = 'https://grateful-meerkat-awake.ngrok-free.app/html/api.php';

  //verifica la autenticación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');

    if (!token || rol !== 'admin') {
      alert('You need to log in as an admin to access this page.');
      navigate('/auth');
    }
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/CV`)
      .then((res) => res.json())
      .then((data) => {
        setCvInfo(data);
        setUpdatedInfo(data);
      });

    fetch(`${API_URL}/edu`)
      .then((res) => res.json())
      .then((data) => setCvEducation(data));

    fetch(`${API_URL}/exp`)
      .then((res) => res.json())
      .then((data) => setCvExperience(data));
  }, []);

  //actualizar cv
  const handleUpdateCV = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/updateCV`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('CV Info updated successfully!');
        } else {
          alert('Failed to update CV Info.');
        }
      });
  };

  //añadir edu
  const handleAddEducation = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/edu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEducation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('New education added successfully!');
          setCvEducation([...cvEducation, newEducation]); // Update local state
          setNewEducation({ school: '', study: '', period: '' }); // Clear form
        } else {
          alert('Failed to add new education.');
        }
      });
  };

  //añadir exp
  const handleAddExperience = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/exp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newExperience),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('New experience added successfully!');
          setCvExperience([...cvExperience, newExperience]); // Update local state
          setNewExperience({ job: '', type: '', experience: '', description: '' }); // Clear form
        } else {
          alert('Failed to add new experience.');
        }
      });
  };

  //elimina edu
  const handleDeleteEducation = (id) => {
    const token = localStorage.getItem('token');
  
    fetch(`${API_URL}/edu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Education record deleted successfully!');
          setCvEducation(cvEducation.filter((edu) => edu.id !== id)); // Actualiza el estado local
        } else {
          alert(data.error || 'Failed to delete education record');
        }
      })
      .catch((error) => {
        console.error('Error deleting education record:', error);
      });
  };
  

  //elimina exp
  const handleDeleteExperience = (id) => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/exp/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Experience record deleted successfully!');
          setCvExperience(cvExperience.filter((exp) => exp.id !== id)); 
        } else {
          alert('Failed to delete experience record.');
        }
      })
      .catch((error) => {
        console.error('Error deleting education record:', error);
      });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl border border-purple-200">
        <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Admin Panel</h1>

        {/* CV Info Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">CV Information</h2>
          {cvInfo && (
            <form onSubmit={handleUpdateCV} className="space-y-4">
              {Object.keys(updatedInfo).map((key) => (
                <div key={key}>
                  <label className="block text-purple-700 mb-1 capitalize">{key}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={updatedInfo[key]}
                    onChange={(e) => setUpdatedInfo({ ...updatedInfo, [key]: e.target.value })}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="font-bold w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                UPDATE CV INFO
              </button>
            </form>
          )}
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">CV Education</h2>

          <form onSubmit={handleAddEducation} className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-purple-700">Add New Education</h3>
            <div>
              <label className="block text-purple-700 mb-1">School</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newEducation.school}
                onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-1">Study</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newEducation.study}
                onChange={(e) => setNewEducation({ ...newEducation, study: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-1">Period</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newEducation.period}
                onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="font-bold w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              ADD EDUCATION
            </button>
          </form>

          <div className="space-y-4">
            {cvEducation.map((edu) => (
              <div key={edu.id} className="bg-purple-50 p-4 rounded-lg border border-purple-300 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">{edu.school}</h3>
                  <p className="text-purple-600">{edu.study}</p>
                  <p className="text-purple-600">{edu.period}</p>
                </div>
                <button
                  onClick={() => handleDeleteEducation(edu.id)}
                  className="font-bold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">CV Experience</h2>

          <form onSubmit={handleAddExperience} className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-purple-700">Add New Experience</h3>
            <div>
              <label className="block text-purple-700 mb-1">Job</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newExperience.job}
                onChange={(e) => setNewExperience({ ...newExperience, job: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-1">Type</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newExperience.type}
                onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-1">Experience</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newExperience.experience}
                onChange={(e) => setNewExperience({ ...newExperience, experience: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-purple-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="3"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="font-bold w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              ADD EXPERIENCE
            </button>
          </form>

          <div className="space-y-4">
            {cvExperience.map((exp) => (
              <div key={exp.id} className="bg-purple-50 p-4 rounded-lg border border-purple-300 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">{exp.job}</h3>
                  <p className="text-purple-600">{exp.type}</p>
                  <p className="text-purple-600">{exp.experience}</p>
                  <p className="text-purple-600">{exp.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="font-bold bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
