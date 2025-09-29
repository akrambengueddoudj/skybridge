import { Users, Target, History, Award } from 'lucide-react'

export default function AboutPage() {
   const stats = [
    { number: '2025', label: 'Founded' },
    { number: '2', label: 'Academic Departments' },
    { number: 'ENPC', label: 'Institution' },
    { number: 'Coming Soon', label: 'First Events' }
  ]

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We believe in the power of community to drive personal and professional growth.'
    },
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Every event and initiative is designed with clear goals and measurable impact.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from events to member support.'
    },
    {
      icon: History,
      title: 'Legacy',
      description: 'Building a lasting legacy that will benefit students for years to come.'
    }
  ]

  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">About SkyBridge Club</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building bridges between students and their future careers since 2021. 
              Our mission is to create meaningful connections and opportunities that transform lives.
            </p>
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

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The vision for SkyBridge Club has been years in the making - a dream to create a vibrant 
                  technology and engineering community within ENPC. That dream began to take shape in 2024 
                  when a passionate group of students from Mechanical Engineering and EEA departments 
                  represented our school at the CIAA competition in Blida.
                </p>
                <p>
                  Our team's remarkable success in their first-ever competition ignited something special. 
                  The experience gave us the courage to aim even higher - towards international rocketry 
                  competitions and beyond. But we realized that to achieve these ambitious goals, we needed 
                  more than just technical skills; we needed a community.
                </p>
                <p>
                  With incredible support from ENPC professors and the school's business incubator, 
                  SkyBridge Club officially launched on May 9th, 2025. While rocketry sparked our journey, 
                  our vision extends far beyond. We're building a comprehensive technology hub that embraces 
                  robotics, software development, AI, and all engineering disciplines.
                </p>
                <p>
                  On October 1st, 2025, we opened our doors to welcome our first members and begin our 
                  event programming. We're not just building rockets; we're building bridges between 
                  students, technologies, and future opportunities.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg mb-6">
                To create a dynamic platform where ENPC students can explore, innovate, and excel in 
                technology and engineering through hands-on projects, competitions, and collaborative learning.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg">
                To establish ENPC as a leading institution for technological innovation and to empower 
                students to become the next generation of engineering leaders and innovators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our community culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}