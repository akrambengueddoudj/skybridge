'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface RegistrationModalProps {
  event: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function RegistrationModal({ event, isOpen, onClose, onSuccess }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    academicYear: '',
    fieldOfStudy: '',
    experienceLevel: '',
    motivation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const academicYearOptions = [
    { value: 'prepa1', label: '1st Year Preparatory Class' },
    { value: 'prepa2', label: '2nd Year Preparatory Class' },
    { value: 'higher3', label: '3rd Year Higher Class' },
    { value: 'higher4', label: '4th Year Higher Class' },
    { value: 'higher5', label: '5th Year Higher Class' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'outside', label: 'Outside ENPC' }
  ]

  const fieldOfStudyOptions = [
    { value: 'cpst', label: 'CPST' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'process', label: 'Process Engineering' },
    { value: 'material', label: 'Material Engineering' },
    { value: 'other', label: 'Other' }
  ]

  const experienceLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          academicYear: formData.academicYear,
          fieldOfStudy: formData.fieldOfStudy,
          experienceLevel: formData.experienceLevel,
          motivation: formData.motivation
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to register')
      }

      onSuccess()
      onClose()
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        academicYear: '',
        fieldOfStudy: '',
        experienceLevel: '',
        motivation: ''
      })
      
      alert('🎉 Successfully registered for the event!')

    } catch (error) {
      console.error('Registration error:', error)
      setError(error instanceof Error ? error.message : 'Failed to register for event')
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Register for {event.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="+213 XXX XX XX XX"
            />
          </div>

          <div>
            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
              Academic Year *
            </label>
            <select
              id="academicYear"
              name="academicYear"
              required
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select your academic year</option>
              {academicYearOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study *
            </label>
            <select
              id="fieldOfStudy"
              name="fieldOfStudy"
              required
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select your field</option>
              {fieldOfStudyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Level in {event.title.split(' - ')[0]} *
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              required
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select your experience level</option>
              {experienceLevelOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
              Motivation (Optional)
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows={3}
              value={formData.motivation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Why are you interested in this event? What do you hope to learn?"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}