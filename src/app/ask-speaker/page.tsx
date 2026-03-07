'use client'

import { useState } from 'react'
import { User, MessageSquare, Share2, Check, Mic, Calendar, Users, HelpCircle } from 'lucide-react'

import { SuccessMessage } from '@/components/success-message'

interface AskSpeakerPageProps {
  eventName?: string
  eventDate?: string
  speakerName?: string
}

export default function AskSpeakerPage({ 
  eventName = "EXPI-Day 2026",
  eventDate = "March 8-9, 2024",
  speakerName = "Our Speakers"
}: AskSpeakerPageProps) {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    question: '',
    questionTopic: '',
    canSharePublicly: true
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const topics = [
    'AI Technology',
    'Career Advice',
    'Industry Trends',
    'Ethics & Society',
    'Technical Implementation',
    'Future Predictions',
    'Personal Experience',
    'Other'
  ]

  const validateForm = () => {
    if (!formData.username.trim()) {
      setSubmitError('Please enter your name')
      return false
    }
    if (!formData.useremail.trim()) {
      setSubmitError('Email address is required')
      return false
    }
    if (!formData.question.trim()) {
      setSubmitError('Please enter your question')
      return false
    }
    if (formData.question.length < 10) {
      setSubmitError('Question must be at least 10 characters')
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
      const submitData = {
        ...formData,
        eventName,
        eventDate,
        speakerName,
        submittedAt: new Date().toISOString()
      }

      const response = await fetch('/api/ask-speaker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitError(result.error || 'There was an error submitting your question. Please try again.')
        return
      }

      setSubmitError('')
      setSuccessMessage(`🎉 Your question has been submitted! ${speakerName} will answer it during or after the event. We'll notify you when it's answered.`)
      setShowSuccess(true)

      // Reset form
      setFormData({
        username: '',
        useremail: '',
        question: '',
        questionTopic: '',
        canSharePublicly: false
      })
    } catch (error) {
      console.error('Error submitting question:', error)
      setSubmitError('There was an error submitting your question. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Mic className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Event Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm mb-4">
              <Calendar className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-600">{eventName}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">{eventDate}</span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">Ask the Speaker</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Have a question for <span className="font-semibold text-blue-600">{speakerName}</span>?
            </p>
            <p className="text-lg text-indigo-700 max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-4">
              No need to raise your hand! Submit your question here and we'll make sure it gets answered.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <p className="font-medium">Submit your question</p>
              <p className="text-sm text-gray-500">Type it here on your phone</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <p className="font-medium">Speaker answers</p>
              <p className="text-sm text-gray-500">During or after the event</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <p className="font-medium">Get notified</p>
              <p className="text-sm text-gray-500">We'll email you the answer</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <p className="font-medium">Share with community</p>
              <p className="text-sm text-gray-500">If you choose to allow it</p>
            </div>
          </div>
        </div>
      </section>

      {/* Question Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Speaker Info Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">{speakerName}</h3>
                  <p className="text-blue-100">Speaker • {eventName}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g. Alex Mercer"
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="useremail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                    <input
                      type="email"
                      id="useremail"
                      name="useremail"
                      value={formData.useremail}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Question Topic (Optional)
              <div className="mb-6">
                <label htmlFor="questionTopic" className="block text-sm font-medium text-gray-700 mb-2">
                  Question Topic (Optional)
                </label>
                <select
                  id="questionTopic"
                  name="questionTopic"
                  value={formData.questionTopic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select a topic</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div> */}

              {/* Question */}
              <div className="mb-6">
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question *
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="What would you like to ask the speaker? Be specific..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.question.length}/500 characters
                </p>
              </div>

              {/* Sharing Consent */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="canSharePublicly"
                    checked={formData.canSharePublicly}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 block mb-1">
                      I'm okay with sharing this question publicly
                    </span>
                    <span className="text-sm text-gray-600">
                      If checked, your question and the speaker's answer may be featured on our social media platforms 
                      (LinkedIn, Instagram, Twitter) to inspire others. We'll never share your email.
                    </span>
                  </div>
                </label>
              </div>

              {/* What happens next */}
              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  What happens next?
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>The speaker will answer questions during the event if time permits</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unanswered questions will be answered after the event</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>You'll receive the answer via email</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Great questions may be shared on our social media (with your permission)</span>
                  </li>
                </ul>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Ask Your Question
                    <MessageSquare className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Recent Questions Preview (Optional)
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Recently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">"How do you see AI impacting entry-level jobs in the next 3 years?"</p>
              <p className="text-sm text-gray-500">— Alex • Asked 5 minutes ago</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">"What's the most underrated skill for someone starting in AI?"</p>
              <p className="text-sm text-gray-500">— Maria • Asked 12 minutes ago</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 mb-2">"How do you balance innovation with ethical considerations?"</p>
              <p className="text-sm text-gray-500">— James • Asked 23 minutes ago</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Social Media Notice */}
      <section className="py-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Share2 className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600 font-semibold">Follow us</span>
          </div>
          <p className="text-gray-700">
            Selected questions and answers may be shared on our LinkedIn, Instagram, and Twitter. 
            Make sure to check the box if you're okay with that!
          </p>
        </div>
      </section>
    </div>
  )
}