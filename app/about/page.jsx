import Navigation from '@/components/Navigation'

export default function About() {
  return (
    <div className='bg-blue-200 h-screen'>
      <Navigation />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">About Page</h1>
        <p className="text-lg text-gray-600">
          This is the about page with smooth hexagon transitions.
        </p>
      </main>
    </div>
  )
}
