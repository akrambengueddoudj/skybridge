import { Calendar, MapPin, Clock, Users, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

// Mock data with images
// Mock data with images
const events = [
  {
    id: 1,
    title: "CIAA 2025 Rocketry Project Launch",
    date: "To be Announced",
    time: "To be Announced",
    location: "To be Announced",
    description: "Kickoff meeting for our ambitious rocketry project! Join us as we begin designing and building model rockets to represent ENPC at the CIAA 2025 competition in Blida. No prior experience required - we'll teach you everything about aerodynamics, propulsion, and rocket design.",
    attendees: "/",
    image: "/events/rocketry-launch.jpg",
    type: "workshop",
    featured: true
  }
]

const pastEvents = [
  {
    id: 4,
    title: "SkyBridge Club Grand Opening",
    date: "2025-10-01",
    description: "Historic launch of SkyBridge Club! We officially opened our doors to welcome the ENPC community. The event featured presentations about our vision, technology demonstrations, and networking with founding members and professors.",
    winners: [],
    image: "/images/events/open_day.jpg",
    attendees: '#',
    highlights: [
      "Official club inauguration",
      "Founding team introductions", 
      "Technology demonstrations",
      "Networking session with professors"
    ]
  }
]

function EventCard({ event }: { event: any }) {
  const getEventTypeColor = (type: string) => {
    const colors = {
      career: "bg-green-100 text-green-800 border-green-200",
      workshop: "bg-blue-100 text-blue-800 border-blue-200",
      networking: "bg-purple-100 text-purple-800 border-purple-200",
      panel: "bg-orange-100 text-orange-800 border-orange-200",
      competition: "bg-red-100 text-red-800 border-red-200"
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="h-48 relative overflow-hidden bg-gradient-to-br from-sky-400 to-blue-500">
        {/* Event image with gradient background as fallback */}
        <div className="w-full h-full flex items-center justify-center">
          <Calendar className="w-12 h-12 text-white opacity-80" />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Event Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>

        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium border border-yellow-500">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.attendees} attendees registered</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
        
        <button className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-medium group-hover:shadow-lg">
          Register for Event
        </button>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const featuredEvents = events.filter(event => event.featured)
  const regularEvents = events.filter(event => !event.featured)

  return (
    <div className="pt-16 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for exciting events designed to help you grow professionally, 
              network with industry leaders, and discover new opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
              <p className="text-lg text-gray-600">Don't miss these highlight events of the semester</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Upcoming Events</h2>
            <p className="text-lg text-gray-600">Explore all our planned events for this semester</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
            <p className="text-lg text-gray-600">Take a look at some of our successful past events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="h-48 bg-gradient-to-br from-sky-300 to-blue-400 rounded-lg mb-4 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-white opacity-80" />
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {event.attendees && (
                  <div className="flex items-center text-gray-600 mb-3">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                )}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <h4 className="font-semibold text-sky-800 mb-2">✨ Event Highlights:</h4>
                    <ul className="list-disc list-inside text-sky-700 space-y-1">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}