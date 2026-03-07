'use client'

import { useState } from 'react'
import { User, Mail, Sparkles, Target, Users, Lightbulb, Heart, Briefcase, Globe, CheckCircle } from 'lucide-react'

import { SuccessMessage } from '@/components/success-message'

const questions = [
  {
    id: 1,
    question: "What career path are you most excited to explore, and why does it inspire you?",
    placeholder: "Share your thoughts openly — there's no wrong answer here…",
    name: "answer1"
  },
  {
    id: 2,
    question: "Which skill do you most want to develop through SkyBridge this semester?",
    placeholder: "Leadership, public speaking, coding, networking…",
    name: "answer2"
  },
  {
    id: 3,
    question: "Describe a challenge you've overcome that shaped who you are today.",
    placeholder: "Your story can motivate someone else…",
    name: "answer3"
  },
  {
    id: 4,
    question: "If you could invite any professional to a SkyBridge workshop, who would it be and what would you ask?",
    placeholder: "Dream big — name, field, and your first question…",
    name: "answer4"
  },
  {
    id: 5,
    question: "What does \"bridging your future\" mean to you personally?",
    placeholder: "Reflect on your goals, values, and where you see yourself going…",
    name: "answer5"
  }
]

export default function SharePage() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    if (!formData.username.trim()) {
      setSubmitError('Display name is required')
      return false
    }
    if (!formData.useremail.trim()) {
      setSubmitError('Email address is required')
      return false
    }
    if (!formData.answer1.trim()) {
      setSubmitError('Please answer question 1')
      return false
    }
    if (!formData.answer2.trim()) {
      setSubmitError('Please answer question 2')
      return false
    }
    if (!formData.answer3.trim()) {
      setSubmitError('Please answer question 3')
      return false
    }
    if (!formData.answer4.trim()) {
      setSubmitError('Please answer question 4')
      return false
    }
    if (!formData.answer5.trim()) {
      setSubmitError('Please answer question 5')
      return false
    }
    if (!formData.consent) {
      setSubmitError('You must agree to share your answers publicly')
      return false
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
      const response = await fetch('/api/shares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitError(result.error || 'There was an error submitting your answers. Please try again.')
        return
      }

      // Success - show success message
      setSubmitError('')
      setSuccessMessage('🎉 Your answers have been shared with the SkyBridge community! Thank you for inspiring others.')
      setShowSuccess(true)

      // Reset form
      setFormData({
        username: '',
        useremail: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        consent: false
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError('There was an error submitting your answers. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
      <section className="bg-gradient-to-br from-purple-50 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Share Your Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your journey can inspire someone else. Share your thoughts, experiences, and aspirations with the SkyBridge community.
            </p>
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
                Your Answers
              </p>
              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
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
                      <p className="text-sm text-gray-500 mt-2">Write as much as you'd like</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="text-amber-900 font-medium mb-1">Public sharing notice</p>
                  <p className="text-amber-800 text-sm">
                    By submitting, you agree that your answers may be displayed on the SkyBridge community board and shared with club members to inspire others.
                  </p>
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

            {/* Submit Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <label className="flex items-start space-x-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700 text-sm">
                  I agree to <strong>share my answers publicly</strong> on the SkyBridge community board. I understand my name and responses may be visible to other club members.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit & Share
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Handle save as draft
                    console.log('Save as draft:', formData)
                  }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Save as draft instead
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Share Your Story?</h2>
            <p className="text-lg text-gray-600">Your experiences can light the path for others</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inspire Others</h3>
              <p className="text-gray-600">Your journey could be exactly what someone needs to hear</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Community</h3>
              <p className="text-gray-600">Connect with others who share similar aspirations</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reflect & Grow</h3>
              <p className="text-gray-600">Gain clarity by articulating your thoughts and goals</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}