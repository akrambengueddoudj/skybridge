'use client'

import { useState } from 'react'
import { Check, Users, Award, Zap, Star, Heart, Target, Bell, Lightbulb, Crown } from 'lucide-react'

import { SuccessMessage } from '@/components/success-message'

const memberTypes = [
  {
    name: "Active Member",
    icon: Users,
    description: "Perfect for students who want to participate in events and grow their network",
    color: "from-blue-500 to-sky-600",
    bgColor: "blue",
    features: [
      "Access to all club events and workshops",
      "Priority registration for limited-seat events",
      "Exclusive newsletter with opportunities",
      "Networking with industry professionals",
      "Event suggestions and feedback rights",
      "Request specific training sessions",
      "Early access to course registrations",
      "Member-only Discord community access"
    ],
    cta: "Join as Active Member"
  },
  {
    name: "Core Team Member",
    icon: Crown,
    description: "For passionate students who want to lead and shape the club's future",
    color: "from-purple-500 to-pink-600",
    bgColor: "purple",
    features: [
      "All Active Member benefits",
      "Leadership and organizational experience",
      "Event planning and management skills",
      "Mentorship from senior team members",
      "Resume-building leadership role",
      "Networking with corporate partners",
      "Professional development training",
      "Recognition as club leadership"
    ],
    cta: "Apply for Core Team"
  }
]

const benefits = [
  {
    icon: Target,
    title: "Career Development",
    description: "Gain skills that employers are looking for"
  },
  {
    icon: Bell,
    title: "Exclusive Access",
    description: "Get first dibs on opportunities and events"
  },
  {
    icon: Lightbulb,
    title: "Skill Building",
    description: "Learn from workshops and hands-on projects"
  },
  {
    icon: Heart,
    title: "Community",
    description: "Join a supportive network of peers"
  }
]

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    major: '',
    year: '',
    interests: '',
    memberType: 'active',
    skills: '',
    motivation: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [submitError, setSubmitError] = useState('')

  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setSubmitError('First name is required')
      return false
    }
    if (!formData.lastName.trim()) {
      setSubmitError('Last name is required')
      return false
    }
    if (!formData.email.trim()) {
      setSubmitError('Email is required')
      return false
    }
    if (!formData.major.trim()) {
      setSubmitError('Major is required')
      return false
    }
    if (!formData.year) {
      setSubmitError('Academic year is required')
      return false
    }
    if (!formData.interests.trim()) {
      setSubmitError('Career interests are required')
      return false
    }
    if (formData.memberType === 'core' && !formData.skills.trim()) {
      setSubmitError('Please describe your skills for the Core Team application')
      return false
    }
    if (formData.memberType === 'core' && !formData.motivation.trim()) {
      setSubmitError('Please explain your motivation for joining the Core Team')
      return false
    }
    
    setSubmitError('')
    return true
  }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Submitting form with data...')
        
        if (!validateForm()) {
        return
        }
        console.log('2')
        
        setIsSubmitting(true)
        setSubmitError('')
        
        try {
        const response = await fetch('/api/members', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            studentId: formData.studentId,
            major: formData.major,
            year: formData.year,
            interests: formData.interests,
            memberType: formData.memberType,
            skills: formData.skills,
            motivation: formData.motivation
            }),
        })
        console.log('3')
        const result = await response.json()
        console.log('4')

        if (!response.ok) {
            // Use our error handler for API errors
            setSubmitError(result.error || { message: result.error })
            return
            // const userMessage = handleSupabaseError(result.error || { message: result.error })
            // throw new Error(userMessage)
        }

        // Success - show success message
        setSubmitError('')
        setSuccessMessage(`🎉 Application submitted successfully! We'll review your ${formData.memberType === 'active' ? 'membership' : 'core team application'} and get back to you soon.`)
        setShowSuccess(true)

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            studentId: '',
            major: '',
            year: '',
            interests: '',
            memberType: 'active',
            skills: '',
            motivation: ''
        })
        } catch (error) {
        console.error('Error submitting form:', error)
        setSubmitError(error instanceof Error ? error.message : 'There was an error submitting your application. Please try again.')
        } finally {
        setIsSubmitting(false)
        }
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
    
  return (
    <div className="pt-16 pb-20">
      {showSuccess && (
        <SuccessMessage 
            message={successMessage}
            onClose={() => setShowSuccess(false)}
        />
      )}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Join SkyBridge Club</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you want to be involved! Whether you want to participate in events 
              or help organize them, we have a place for you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join Our Community?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No matter which path you choose, you'll gain valuable experiences and connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-sky-200 group-hover:to-blue-200">
                  <benefit.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h2>
            <p className="text-lg text-gray-600">Select the membership type that matches your interests and goals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {memberTypes.map((type, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-8 bg-white shadow-lg border-2 ${
                  formData.memberType === type.name.toLowerCase().split(' ')[0] 
                    ? 'border-sky-500 shadow-xl' 
                    : 'border-gray-100'
                } transition-all duration-300`}
              >
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <type.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{type.name}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 text-${type.bgColor}-500 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    memberType: type.name.toLowerCase().includes('core') ? 'core' : 'active' 
                  }))}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    formData.memberType === type.name.toLowerCase().split(' ')[0]
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formData.memberType === type.name.toLowerCase().split(' ')[0] ? '✓ Selected' : type.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Core Team Callout */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto border border-purple-100">
            <div className="flex items-start space-x-4">
              <Lightbulb className="w-12 h-12 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Considering Core Team?</h3>
                <p className="text-gray-700 mb-4">
                  We're looking for passionate students who want to make a real impact! As a Core Team member, 
                  you'll gain valuable leadership experience, develop organizational skills, and help shape 
                  the future of our club. If you're enthusiastic about event planning, community building, 
                  or have specific skills you'd like to contribute, we'd love to have you on board!
                </p>
                <p className="text-purple-700 font-semibold">
                  No previous experience required - just bring your passion and willingness to learn!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {formData.memberType === 'core' ? 'Apply for Core Team' : 'Join as Active Member'}
            </h2>
            <p className="text-lg text-gray-600">
              {formData.memberType === 'core' 
                ? "Tell us about yourself and why you're interested in joining our Core Team"
                : "Fill out the form below to become an Active Member"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year *
                </label>
                <select
                  id="year"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                >
                  <option value="">Select your year</option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
                Major/Field of Study *
              </label>
              <input
                type="text"
                id="major"
                name="major"
                required
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="e.g., Computer Science, Business, Engineering"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                Career Interests *
              </label>
              <textarea
                id="interests"
                name="interests"
                rows={3}
                required
                value={formData.interests}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="Tell us about your career interests and goals..."
              />
            </div>

            {/* Core Team Specific Fields */}
            {formData.memberType === 'core' && (
              <>
                <div className="mb-6">
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Skills & Experience *
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows={3}
                    required
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="What skills or experiences would you bring to the Core Team? (event planning, technical skills, leadership, etc.)"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join the Core Team? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    rows={4}
                    required
                    value={formData.motivation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="Tell us why you're interested in a leadership role and what you hope to contribute..."
                  />
                </div>
              </>
            )}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0">⚠️</div>
                  <div>
                    <p className="text-red-800 font-medium mb-1">Unable to submit application</p>
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                formData.memberType === 'core' ? 'Submit Core Team Application' : 'Become an Active Member'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}