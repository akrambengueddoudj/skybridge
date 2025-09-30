import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/images/logo/logo1.png" // Replace with your logo path
                  alt="SkyBridge Club Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full overflow-hidden"
                />
              </div>
              <span className="font-bold text-xl">SkyBridgeClub</span>
            </Link>
            <p className="text-gray-300 max-w-md">
              Bridging the gap between students and their dream careers through events, 
              networking, and community building. Join us in creating meaningful connections 
              and opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/join" className="text-gray-300 hover:text-white transition-colors">Become a Member</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SkyBridge Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}