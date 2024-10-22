import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Sleep Tracker',
  description: 'Monitor and improve your sleep patterns',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[url('/assets/image.png')] bg-center bg-fixed min-h-screen text-gray-900 ">
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold mb-4 sm:mb-0">
              <span className="text-yellow-300">Sleep</span>Tracker
            </Link>
            <ul className="flex flex-wrap justify-center space-x-2 sm:space-x-4">
              <li><Link href="/" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">Home</Link></li>
              <li><Link href="/user-data" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">My Data</Link></li>
              <li><Link href="/recommendations" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">Chat BOT</Link></li>
              <li><Link href="/connect-specialist" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">Connect Specialist</Link></li>
              <li><Link href="/relaxation" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">Sleep Aid</Link></li>
              <li><Link href="/dream-analyze" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">Dream Analysis</Link></li>
              <li><Link href="/about" className="hover:text-yellow-300 transition duration-300 px-3 py-2 rounded-md hover:bg-blue-700">About Us</Link></li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto mt-8 px-4 pb-8">
          {children}
        </main>
      </body>
    </html>
  )
}