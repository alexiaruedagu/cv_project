'use client'

import React, { useState, useEffect } from 'react'; 
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { StatsChart } from './StatsChart';

const SkillBar = ({ skill, level }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-purple-700">{skill}</span>
      <span className="text-sm font-medium text-purple-700">{level}%</span>
    </div>
    <div className="w-full bg-purple-200 rounded-full h-2.5">
      <div className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${level}%` }}></div>
    </div>
  </div>
)

export function CvForm() {
  const [cvInfo, setCvInfo] = useState([])
  const [cvExperience, setCvExperience] = useState([])
  const [cvEducation, setCvEducation] = useState([])

  // Fetch data from the API
  useEffect(() => {
    fetch("http://172.17.22.170/html/api.php?table=cv_info")
      .then((res) => res.json())
      .then((data) => setCvInfo(data))
      .catch((err) => console.error("Error fetching CV Info:", err))

    fetch("http://172.17.22.170/html/api.php?table=cv_experience")
      .then((res) => res.json())
      .then((data) => setCvExperience(data))
      .catch((err) => console.error("Error fetching CV Experience:", err))

    fetch("http://172.17.22.170/html/api.php?table=cv_education")
      .then((res) => res.json())
      .then((data) => setCvEducation(data))
      .catch((err) => console.error("Error fetching CV Education:", err))
  }, [])

  if (!cvInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }
  
  const AnimatedTerminal = () => {
    const [text, setText] = useState('')
    const fullText = '> Hello World!\n> Discover more about me!'
  
    React.useEffect(() => {
      let i = 0
      const typing = setInterval(() => {
        setText(fullText.slice(0, i))
        i++
        if (i > fullText.length) clearInterval(typing)
      }, 50)
      return () => clearInterval(typing)
    }, [])
  
    return (
      <div className="bg-gray-900 rounded-lg p-3 font-mono text-green-400 text-sm">
        <div className="flex space-x-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <pre className="whitespace-pre-wrap">{text}</pre>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-purple-200">
        {/* Header Section */}
        <header className="text-center mb-8">
          {cvInfo.map((inf) => (
            <h1 className="text-4xl font-bold text-purple-800 mb-2">{inf.name}</h1>
          ))}
        </header>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
            <AnimatedTerminal />
          </div>
          {cvInfo.map((inf) => (
            <div>
              <div className="flex items-center mb-2 text-purple-700">
                <Mail className="w-5 h-5 mr-2" />
                <span>{inf.email}</span>
              </div>
              <div className="flex items-center mb-2 text-purple-700">
                <Phone className="w-5 h-5 mr-2" />
                <span>{inf.phone}</span>
              </div>
              <div className="flex items-center mb-2 text-purple-700">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{inf.ubication}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <Briefcase className="w-6 h-6 mr-2" />
            Experience
          </h2>
          <div className="space-y-4">
            {cvExperience.map((exp) => (
              <div key={exp.id} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="text-xl font-medium text-purple-800">{exp.job}</h3>
                <p className="text-purple-600">{exp.experience}</p>
                <p className="text-purple-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2" />
            Education
          </h2>
          <div className="space-y-4">
            {cvEducation.map((edu) => (
              <div key={edu.id} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="text-xl font-medium text-purple-800">{edu.school}</h3>
                <p className="text-purple-600">{edu.study}</p>
                <p className="text-purple-700">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <StatsChart/>  
        </section> 
      </div>
    </div>
  )
}
