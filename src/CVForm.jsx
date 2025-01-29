'use client'

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { StatsChart } from './StatsChart';
import { Header } from './Header';

export function CvForm() {
  const [cvInfo, setCvInfo] = useState([])
  const [cvExperience, setCvExperience] = useState([])
  const [cvEducation, setCvEducation] = useState([])

  useEffect(() => {
    fetch("https://grateful-meerkat-awake.ngrok-free.app/html/api.php/CV", {   method: 'GET',   headers: {     'ngrok-skip-browser-warning': 'true' }})
      .then((res) => res.json())
      .then((data) => setCvInfo(data))
      .catch((err) => console.error("Error fetching CV Info:", err))

    fetch("https://grateful-meerkat-awake.ngrok-free.app/html/api.php/exp", {   method: 'GET',   headers: {     'ngrok-skip-browser-warning': 'true' }})
      .then((res) => res.json())
      .then((data) => setCvExperience(data))
      .catch((err) => console.error("Error fetching CV Experience:", err))

    fetch("https://grateful-meerkat-awake.ngrok-free.app/html/api.php/edu", {   method: 'GET',   headers: {     'ngrok-skip-browser-warning': 'true' }})
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
    const fullText = `> Welcome to my CV!\n> Web Developer and Graphic Designer`

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
      <Header />
      <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl border border-purple-200">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">{cvInfo.name}</h1>
        </header>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <AnimatedTerminal />
          </div>
          <div>
            <div className="flex items-center mb-2 text-purple-700">
              <Mail className="w-5 h-5 mr-2" />
              <span>{cvInfo.email}</span>
            </div>
            <div className="flex items-center mb-2 text-purple-700">
              <Phone className="w-5 h-5 mr-2" />
              <span>{cvInfo.phone}</span>
            </div>
            <div className="flex items-center mb-2 text-purple-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{cvInfo.ubication}</span>
            </div>
          </div>
        </div>
        {/* Intro Section */}
        <section className="mb-8">
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500 shadow-md">
            <h2 className="text-3xl font-semibold font-mono text-purple-800 mb-4">&gt; Hello World!</h2>
            <p className="text-purple-700 leading-relaxed">
              My name is Alexia Rueda, and I am a passionate web developer and graphic designer.
              With a solid foundation in technology and creativity, I specialize in creating unique digital
              experiences. <br /> Feel free to explore my CV to learn more about my skills, education, and professional journey.
            </p>
          </div>
        </section>


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
          <StatsChart />
        </section>
      </div>
    </div>
  )
}
