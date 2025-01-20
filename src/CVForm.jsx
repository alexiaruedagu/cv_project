'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code, Terminal, Github, Linkedin, Twitter } from 'lucide-react'

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

const AnimatedTerminal = () => {
  const [text, setText] = useState('')
  const fullText = '> Hello World!\n> Discover more about me\n> Feel free to contact me!'

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
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-green-400 text-sm">
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <pre className="whitespace-pre-wrap">{text}</pre>
    </div>
  )
}

export function CvForm() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-purple-200">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Alexia Rueda</h1>
          <p className="text-xl text-purple-600">Web Developer & Graphic Designer</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <AnimatedTerminal />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-2 text-purple-700">
              <Mail className="w-5 h-5 mr-2" />
              <span>jane.doe@example.com</span>
            </div>
            <div className="flex items-center mb-2 text-purple-700">
              <Phone className="w-5 h-5 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center mb-2 text-purple-700">
              <MapPin className="w-5 h-5 mr-2" />
              <span>New York, NY</span>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-purple-600 hover:text-purple-800">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-800">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-800">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2" />
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkillBar skill="JavaScript/TypeScript" level={95} />
            <SkillBar skill="React/Next.js" level={90} />
            <SkillBar skill="Node.js" level={85} />
            <SkillBar skill="Python" level={80} />
            <SkillBar skill="SQL/NoSQL" level={85} />
            <SkillBar skill="AWS/Cloud Services" level={75} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <Briefcase className="w-6 h-6 mr-2" />
            Experience
          </h2>
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-xl font-medium text-purple-800">Senior Full Stack Developer - Tech Innovations Inc.</h3>
              <p className="text-purple-600">2018 - Present</p>
              <ul className="list-disc list-inside text-purple-700 mt-2">
                <li>Architected and developed scalable microservices using Node.js and TypeScript</li>
                <li>Led the frontend team in migrating legacy apps to Next.js, improving performance by 40%</li>
                <li>Implemented CI/CD pipelines with GitHub Actions and AWS, reducing deployment time by 60%</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="text-xl font-medium text-purple-800">Full Stack Developer - Digital Creations LLC</h3>
              <p className="text-purple-600">2015 - 2018</p>
              <ul className="list-disc list-inside text-purple-700 mt-2">
                <li>Developed and maintained multiple React-based web applications</li>
                <li>Designed and implemented RESTful APIs using Express.js and MongoDB</li>
                <li>Optimized database queries and implemented caching, improving response times by 30%</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2" />
            Education
          </h2>
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h3 className="text-xl font-medium text-purple-800">B.S. in Computer Science</h3>
            <p className="text-purple-600">University of Technology, 2015</p>
            <p className="text-purple-700 mt-2">Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
            <Terminal className="w-6 h-6 mr-2" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="text-lg font-medium text-purple-800">AI-Powered Task Manager</h3>
              <p className="text-purple-700 mt-2">A React Native app using OpenAI's GPT-3 for smart task prioritization and scheduling.</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="text-lg font-medium text-purple-800">Blockchain Voting System</h3>
              <p className="text-purple-700 mt-2">An Ethereum-based decentralized app (DApp) for secure and transparent online voting.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

