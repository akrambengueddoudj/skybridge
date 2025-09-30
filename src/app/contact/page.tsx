'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond quickly",
    details: "skybridge.enpc@gmail.com",
    link: "mailto:skybridge.enpc@gmail.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Prefered from 9am to 8pm",
    details: "+213 655 784 664",
    link: "tel:+213655784664"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Stop by our office",
    details: "National Polytechnic School of Constantine, Algeria",
    link: "#"
  },
  {
    icon: Clock,
    title: "Office Hours",
    description: "Come meet with us",
    details: "Sun-Thu: 11AM-4PM",
    link: "#"
  }
]

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/Club.SkyBridge', icon: '📘' },
  // { name: 'Twitter', url: '#', icon: '🐦' },
  { name: 'Instagram', url: 'https://www.instagram.com/skybridge.club/', icon: '📷' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/skybridge-club', icon: '💼' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call to Supabase
    try {
      // Here you would insert into Supabase messages table
      console.log('Form data to be saved:', formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Message sent successfully! We\'ll get back to you soon.')
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about SkyBridge Club? We're here to help! Reach out to us 
              through any of the channels below or send us a message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-sky-200 group-hover:to-blue-200">
                  <item.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sky-600 font-medium">{item.details}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Social */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
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
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social & Additional Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="text-sky-100 mb-6">
                  Follow us on social media to stay updated with the latest news, events, 
                  and opportunities from SkyBridge Club.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">What technologies does the club focus on?</h4>
                    <p className="text-gray-600 text-sm">
                      While we started with rocketry, we now cover a wide range of technologies including 
                      robotics, software development, AI, mechanical engineering, and electronics. We're 
                      always open to exploring new technological domains!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Do I need prior experience to join?</h4>
                    <p className="text-gray-600 text-sm">
                      Not at all! We welcome students from all backgrounds and skill levels. Whether you're 
                      a beginner or have experience, we have opportunities for everyone to learn and contribute.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Can students from any department join?</h4>
                    <p className="text-gray-600 text-sm">
                      Absolutely! SkyBridge Club is open to all ENPC students. We believe diverse perspectives 
                      from different engineering departments create the most innovative solutions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">What kind of events do you organize?</h4>
                    <p className="text-gray-600 text-sm">
                      We host workshops, technical training sessions, project development groups, 
                      competition preparation teams, and networking events with industry professionals 
                      and professors.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">How can I get involved in rocketry projects?</h4>
                    <p className="text-gray-600 text-sm">
                      Our rocketry team is always looking for passionate members! You can join ongoing 
                      projects or propose new ones. We provide training and guidance regardless of your 
                      current experience level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}