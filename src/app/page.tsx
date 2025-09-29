import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Calendar, Target, Star, Award, Zap, Heart } from 'lucide-react'

// Core Team Members Data
const coreTeam = [
  {
    name: "Alex Johnson",
    role: "Club President",
    image: "/team/alex-johnson.jpg", // Replace with actual images
    description: "Leading the vision and strategy of SkyBridge Club",
    skills: ["Leadership", "Strategy", "Public Speaking"]
  },
  {
    name: "Sarah Chen",
    role: "Events Director",
    image: "/team/sarah-chen.jpg",
    description: "Organizing amazing events and networking opportunities",
    skills: ["Event Planning", "Networking", "Coordination"]
  },
  {
    name: "Marcus Rodriguez",
    role: "Tech Lead",
    image: "/team/marcus-rodriguez.jpg",
    description: "Driving our technical initiatives and workshops",
    skills: ["Web Development", "AI/ML", "Technical Training"]
  },
  {
    name: "Emily Watson",
    role: "Community Manager",
    image: "/team/emily-watson.jpg",
    description: "Building and nurturing our amazing community",
    skills: ["Community Building", "Communication", "Mentorship"]
  },
  {
    name: "David Kim",
    role: "Partnerships Manager",
    image: "/team/david-kim.jpg",
    description: "Connecting with industry partners and sponsors",
    skills: ["Partnerships", "Business Development", "Negotiation"]
  },
  {
    name: "Jessica Lee",
    role: "Marketing Lead",
    image: "/team/jessica-lee.jpg",
    description: "Spreading the word about our mission and events",
    skills: ["Digital Marketing", "Content Creation", "Branding"]
  }
]

const features = [
  {
    icon: Users,
    title: 'Community',
    description: 'Join a vibrant community of ambitious students and professionals.'
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Regular workshops, networking events, and career fairs.'
  },
  {
    icon: Target,
    title: 'Opportunities',
    description: 'Connect with industry leaders and discover career paths.'
  },
  {
    icon: Star,
    title: 'Growth',
    description: 'Develop skills that will propel your career forward.'
  }
]

const stats = [
  { number: 'New!', label: 'Founded 2025' },
  { number: '50+', label: 'Expected Members' },
  { number: '10+', label: 'Planned Events' },
  { number: '2', label: 'Strategic Partners' }
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-100 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float">
            <div className="inline-flex items-center space-x-2 bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Join 500+ students already members</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Bridge Your Future with{' '}
            <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              SkyBridge
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect, learn, and grow with SkyBridge Club. We're dedicated to helping students 
            build the bridges that lead to successful careers through networking, workshops, 
            and community support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/join" 
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center px-8 py-3 border border-sky-200 text-sky-700 font-medium rounded-lg hover:bg-sky-50 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-sky-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join SkyBridge Club?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the tools, connections, and opportunities to help you succeed 
              in your academic and professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-sky-200 group-hover:to-blue-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Core Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate students dedicated to building bridges and creating opportunities 
              for our community. Each member brings unique skills and expertise to make 
              SkyBridge Club amazing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 bg-gradient-to-r from-sky-400 to-blue-500 relative overflow-hidden">
                  {/* Placeholder for team member photo */}
                  <div className="w-full h-full bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sky-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <Heart className="w-12 h-12 text-sky-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Want to Join Our Core Team?
              </h3>
              <p className="text-gray-600 mb-6">
                We're always looking for passionate students who want to make a difference. 
                Bring your unique skills and help us build even more bridges for students!
              </p>
              <Link 
                href="/join" 
                className="inline-flex items-center px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors duration-200"
              >
                Apply for Core Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your Bridge?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join hundreds of students who are already taking their careers to new heights.
          </p>
          <Link 
            href="/join" 
            className="inline-flex items-center px-8 py-3 bg-white text-sky-700 font-medium rounded-lg hover:bg-sky-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Become a Member <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}