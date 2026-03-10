'use client'

import { useState } from 'react'
import { User, Sparkles, Heart, Users, Target, Zap, BookOpen, Award, TrendingUp } from 'lucide-react'

import { SuccessMessage } from '@/components/success-message'

interface SharePageProps {
  eventName?: string
  eventDate?: string
  isPostEvent?: boolean
}

export default function SharePage({ 
  eventName = "EXPI-Day 2026",
  eventDate = "March 8-9, 2024",
  isPostEvent = true 
}: SharePageProps) {
  const [formData, setFormData] = useState({
  username: '',
  useremail: '',
  answer1: '', answer2: '', answer3: '', answer4: '', answer5: '',
  answer6: '', answer7: '', answer8: '', answer9: '', answer10: '',
  answer11: '', answer12: '', answer13: '', answer14: '', answer15: '',
  answer16: '', answer17: '', answer18: '', answer19: '', answer20: ''
})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const pageConfig = {
    pre: {
      title: "Before the Conference",
      subtitle: `Share your thoughts before ${eventName}`,
      description: "Tell us what you know now. After the conference, you'll answer the same questions and see how much you've learned!",
      buttonText: "Submit Pre-Conference Answers",
      successMessage: "🎉 Thanks for sharing! You'll receive the same questions after the conference to see your progress.",
      badge: "PRE-EVENT",
      badgeColor: "from-blue-500 to-cyan-600"
    },
    post: {
      title: "After the Conference",
      subtitle: `Share what you learned at ${eventName}`,
      description: "Now that you've attended the conference, answer the same questions again. We'll compare your answers and showcase your learning journey!",
      buttonText: "Submit Post-Conference Answers",
      successMessage: "🎉 Amazing! We'll compare your answers and share your learning transformation soon!",
      badge: "POST-EVENT",
      badgeColor: "from-green-500 to-emerald-600"
    }
  }

  const config = isPostEvent ? pageConfig.post : pageConfig.pre

const questions = [
  {
    id: 1,
    question: "What do you think is the biggest difference between university studies and professional life?",
    placeholder: "Responsibility, teamwork, deadlines, continuous learning...",
    name: "answer1"
  },
  {
    id: 2,
    question: "What do you think is the biggest challenge engineering graduates face when starting their first job?",
    placeholder: "Adapting to the workplace, applying theory, communication...",
    name: "answer2"
  },
  {
    id: 3,
    question: "Which skill do you believe is most important for a young engineer entering the workforce?",
    placeholder: "Technical knowledge, problem solving, communication, adaptability...",
    name: "answer3"
  },
  {
    id: 4,
    question: "How many of you think modern industrial systems rely more on automated control systems than on human monitoring?",
    placeholder: "Automation vs human supervision in modern industry...",
    name: "answer4"
  },
  {
    id: 5,
    question: "What do you think is the biggest risk in large industrial infrastructures like oil or gas plants?",
    placeholder: "Mechanical failure, human error, monitoring systems, environment...",
    name: "answer5"
  },
  {
    id: 6,
    question: "Which stage do you think is hardest for engineers when developing a new idea into reality?",
    placeholder: "Design, prototyping, testing, manufacturing...",
    name: "answer6"
  },
  {
    id: 7,
    question: "What do you think is the most important factor for turning an idea into a successful project?",
    placeholder: "Technical design, team motivation, funding, user needs...",
    name: "answer7"
  },
  {
    id: 8,
    question: "If you had to design a startup, what problem would you try to solve?",
    placeholder: "Energy, AI technology, industrial problems, daily life issues...",
    name: "answer8"
  },
  {
    id: 9,
    question: "When engineers develop a new product, what do you think is the biggest challenge during the prototyping phase?",
    placeholder: "Budget, materials, testing iterations, scalability...",
    name: "answer9"
  },
  {
    id: 10,
    question: "When engineers create a new product, what do you think is the hardest part?",
    placeholder: "Idea generation, system design, prototyping, market launch...",
    name: "answer10"
  },
  {
    id: 11,
    question: "Have you heard about radiative cooling for photovoltaic panels, and how do you think it improves efficiency?",
    placeholder: "Temperature reduction, heat reflection, improved materials...",
    name: "answer11"
  },
  {
    id: 12,
    question: "What practical challenges might engineers face when implementing radiative cooling in solar panels?",
    placeholder: "Material limits, cost, climate conditions, system integration...",
    name: "answer12"
  },
  {
    id: 13,
    question: "What do you think is the biggest challenge for renewable energy today?",
    placeholder: "Energy storage, efficiency, cost, grid integration...",
    name: "answer13"
  },
  {
    id: 14,
    question: "Do you think solar panels work better in very hot climates or moderate climates?",
    placeholder: "Hot climates, moderate climates, technology dependent...",
    name: "answer14"
  },
  {
    id: 15,
    question: "What advice do you think experienced graduates would give to their younger student selves?",
    placeholder: "Build projects, gain experience, networking, research...",
    name: "answer15"
  },
  {
    id: 16,
    question: "What do you think is the biggest challenge when moving from mathematical theory to real engineering systems?",
    placeholder: "Real-world conditions, constraints, system integration, validation...",
    name: "answer16"
  },
  {
    id: 17,
    question: "When engineers design complex systems, what factor do you think is most often underestimated?",
    placeholder: "Human factors, system integration, maintenance, communication...",
    name: "answer17"
  },
  {
    id: 18,
    question: "Modern engineering projects involve technology, people, and organization. Which do you think has the greatest impact on success?",
    placeholder: "Technology, teamwork, management, balance of all...",
    name: "answer18"
  },
  {
    id: 19,
    question: "Agile methods are becoming common in engineering projects. What do you think is their main advantage?",
    placeholder: "Faster cycles, adaptability, collaboration, risk reduction...",
    name: "answer19"
  },
  {
    id: 20,
    question: "How do you think Artificial Intelligence will most impact engineering in the future?",
    placeholder: "Design assistance, automation, data-driven decisions, intelligent systems...",
    name: "answer20"
  }
];

  const validateForm = () => {
  if (!formData.username.trim()) {
    setSubmitError('Display name is required')
    return false
  }
  if (!formData.useremail.trim()) {
    setSubmitError('Email address is required')
    return false
  }
  
  // Check all 20 answers
  for (let i = 1; i <= 20; i++) {
    if (!formData[`answer${i}` as keyof typeof formData]?.trim()) {
      setSubmitError(`Please answer question ${i}`)
      return false
    }
  }
  
  setSubmitError('')
  return true
}

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!validateForm()) {
    return
  }
  
  setIsSubmitting(true)
  setSubmitError('')
  
  try {
    // Add event type to the data
    const submitData = {
      ...formData,
      eventName: "AI Revolution 2024", // or pass as prop
      eventDate: "March 15, 2024", // or pass as prop
      responseType: isPostEvent ? 'post' : 'pre',
      submittedAt: new Date().toISOString()
    }

    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    })

    const result = await response.json()

    if (!response.ok) {
      setSubmitError(result.error || 'There was an error submitting your answers. Please try again.')
      return
    }

    setSubmitError('')
    setSuccessMessage(result.message || config.successMessage)
    setShowSuccess(true)

    // Reset form
    setFormData({
      username: '',
      useremail: '',
      answer1: '', answer2: '', answer3: '', answer4: '', answer5: '',
      answer6: '', answer7: '', answer8: '', answer9: '', answer10: '',
      answer11: '', answer12: '', answer13: '', answer14: '', answer15: '',
      answer16: '', answer17: '', answer18: '', answer19: '', answer20: ''
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    setSubmitError('There was an error submitting your answers. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="pt-16 pb-20 bg-gray-50">
      {showSuccess && (
        <SuccessMessage 
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-purple-50 to-pink-100 py-20 relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Event Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-6">
              <Zap className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-semibold text-purple-600">{eventName}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">{eventDate}</span>
            </div>
            
            {/* Pre/Post Badge */}
            <div className="flex justify-center mb-6">
              <div className={`inline-block bg-gradient-to-r ${config.badgeColor} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                {config.badge}
              </div>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">{config.title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              {config.subtitle}
            </p>
            <p className="text-lg text-purple-700 max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      {/* Learning Journey Visual */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Step 1: Pre-Event</p>
              <p className="text-sm text-gray-500">Share what you know</p>
            </div>
            <div className="flex-1 relative">
              <div className="border-t-2 border-dashed border-gray-300 absolute top-8 left-0 right-0"></div>
              <div className="relative flex justify-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900">Step 2: Attend Event</p>
              <p className="text-sm text-gray-500">Learn from experts</p>
            </div>
            <div className="flex-1 relative">
              <div className="border-t-2 border-dashed border-gray-300 absolute top-8 left-0 right-0"></div>
              <div className="relative flex justify-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900">Step 3: Post-Event</p>
              <p className="text-sm text-gray-500">Share what you learned</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Profile Section */}
            <div>
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-4 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Your Profile
              </p>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👤</span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                        Display Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          👤
                        </span>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="e.g. Alex Mercer"
                          autoComplete="name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="useremail" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          ✉️
                        </span>
                        <input
                          type="email"
                          id="useremail"
                          name="useremail"
                          value={formData.useremail}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div>
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-4 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                {isPostEvent ? "What did you learn?" : "What do you think now?"}
              </p>
              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-8 h-8 bg-gradient-to-r ${isPostEvent ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-cyan-600'} rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0`}>
                          {q.id}
                        </div>
                        <p className="text-lg font-medium text-gray-900">{q.question}</p>
                      </div>
                      <div className="border-t border-gray-100 my-4"></div>
                      <textarea
                        name={q.name}
                        value={formData[q.name as keyof typeof formData] as string}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                        placeholder={q.placeholder}
                      />
                      <p className="text-sm text-gray-500 mt-2">Be honest and detailed — your answers will be compared after the event!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Mechanics Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🎮 How the Learning Game Works</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">①</span>
                      Answer these questions before attending the conferences
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">②</span>
                      Attend {eventName} and absorb all the knowledge
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">③</span>
                      Answer the same questions again after the event
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">④</span>
                      Watch your transformation — we'll showcase the difference!
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-red-600 mt-0.5">⚠️</span>
                  <div>
                    <p className="text-red-800 font-medium mb-1">Unable to submit</p>
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r ${isPostEvent ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-cyan-600'} text-white py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    {config.buttonText}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                {isPostEvent 
                  ? "Thanks for completing the journey! We can't wait to share your progress." 
                  : "Your answers will be saved. We'll email you the same questions after the event!"}
              </p>
            </div>
          </form>
        </div>
      </section>

            {/* Transformation Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-3 bg-purple-200 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-purple-700" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Learning Journey Will Inspire Others</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            After the event, we'll compare pre and post answers and share the most inspiring transformations on our community board!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Biggest Growth</h3>
              <p className="text-sm text-gray-600">Most improved understanding</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">💭</div>
              <h3 className="font-semibold text-gray-900 mb-2">Most Insightful</h3>
              <p className="text-sm text-gray-600">Deepest reflections & ideas</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Favorite</h3>
              <p className="text-sm text-gray-600">Most liked transformation</p>
            </div>
          </div>

          <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
            <p className="text-purple-800 font-medium">
              🌟 Top transformations will be featured on our community board and announced at the next SkyBridge meetup!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}