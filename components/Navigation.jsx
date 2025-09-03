import { Link } from 'next-view-transitions'

export default function Navigation() {
  return (
    <nav className="p-6 bg-white shadow-md">
      <div className="max-w-4xl mx-auto flex space-x-6">
        <Link 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          About
        </Link>
        <Link 
          href="/contact" 
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}
