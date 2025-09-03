import Navigation from '@/components/Navigation'

export default function Contact() {
  return (
    <div className='bg-amber-900 h-screen'>
      <Navigation />
      <main className="max-w-4xl mx-auto p-6 ">
        <h1 className="text-4xl font-bold mb-4">Contact Page</h1>
        <p className="text-lg text-gray-600">
          Get in touch with us here!
        </p>
      </main>
    </div>
  )
}
