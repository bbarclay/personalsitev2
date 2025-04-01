export default function Custom500() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">500 - Server Error</h1>
      <p className="text-lg mb-8">
        We apologize, but something went wrong on our server.
      </p>
      <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Return Home
      </a>
    </div>
  )
} 