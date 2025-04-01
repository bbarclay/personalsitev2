export default function Custom404() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Return Home
      </a>
    </div>
  )
} 