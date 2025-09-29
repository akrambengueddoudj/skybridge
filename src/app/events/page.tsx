import { Calendar, MapPin, Clock, Users, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

// Mock data with images
const events = [
  {
    id: 1,
    title: "Tech Career Fair 2024",
    date: "2024-03-15",
    time: "10:00 AM - 3:00 PM",
    location: "Student Union Building",
    description: "Connect with top tech companies and discover internship opportunities. Bring your resume! Meet recruiters from Google, Microsoft, Amazon, and more.",
    attendees: 120,
    image: "/events/tech-fair-2024.jpg", // Replace with actual event images
    type: "career",
    featured: true
  },
  {
    id: 2,
    title: "Resume Workshop & Review",
    date: "2024-03-20",
    time: "2:00 PM - 4:00 PM",
    location: "Library Room 301",
    description: "Learn how to craft the perfect resume from industry professionals. Get personalized feedback and tips to make your resume stand out.",
    attendees: 45,
    image: "/events/resume-workshop.jpg",
    type: "workshop",
    featured: false
  },
  {
    id: 3,
    title: "Industry Networking Mixer",
    date: "2024-03-25",
    time: "6:00 PM - 8:00 PM",
    location: "Campus Center Ballroom",
    description: "Casual networking event with alumni and professionals from various industries. Perfect for making connections in a relaxed atmosphere.",
    attendees: 80,
    image: "/events/networking-mixer.jpg",
    type: "networking",
    featured: true
  },
  {
    id: 4,
    title: "AI & Machine Learning Panel",
    date: "2024-04-05",
    time: "3:00 PM - 5:00 PM",
    location: "Engineering Building Auditorium",
    description: "Panel discussion with experts in AI and machine learning. Learn about the latest trends and career opportunities in this rapidly growing field.",
    attendees: 95,
    image: "/events/ai-panel.jpg",
    type: "panel",
    featured: false
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    date: "2024-04-12",
    time: "1:00 PM - 5:00 PM",
    location: "Business School Forum",
    description: "Watch students pitch their innovative startup ideas to a panel of investors. Great opportunity for aspiring entrepreneurs!",
    attendees: 150,
    image: "/events/pitch-competition.jpg",
    type: "competition",
    featured: true
  },
  {
    id: 6,
    title: "Web Development Bootcamp",
    date: "2024-04-18",
    time: "9:00 AM - 4:00 PM",
    location: "Computer Lab 204",
    description: "Full-day intensive workshop covering modern web development technologies. Perfect for beginners and intermediate developers.",
    attendees: 60,
    image: "/events/web-dev-bootcamp.jpg",
    type: "workshop",
    featured: false
  }
]

const pastEvents = [
  {
    id: 7,
    title: "Startup Pitch Competition",
    date: "2024-02-10",
    description: "Students pitched their startup ideas to a panel of investors. Over $5,000 in prizes awarded!",
    winners: ["Team Innovate", "TechVisionaries", "EcoSolutions"],
    image: "/events/past-pitch.jpg"
  },
  {
    id: 8,
    title: "Mock Interview Session",
    date: "2024-02-18",
    description: "Practice interviews with HR professionals from leading companies. Participants received valuable feedback.",
    winners: [],
    image: "/events/past-interviews.jpg"
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
      <div className="h-48 relative overflow-hidden">
        {/* Event Image */}
        <div className="w-full h-full bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center">
          <ImageIcon className="w-12 h-12 text-white opacity-80" />
        </div>
        {/* <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        /> */}
        
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
                <p className="text-gray-600 mb-4">{event.description}</p>
                {event.winners.length > 0 && (
                  <div className="bg-sky-50 rounded-lg p-4 border border-sky-100">
                    <h4 className="font-semibold text-sky-800 mb-2">🏆 Winners:</h4>
                    <ul className="list-disc list-inside text-sky-700">
                      {event.winners.map((winner, index) => (
                        <li key={index}>{winner}</li>
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