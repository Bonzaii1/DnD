import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page not found.</p>
      <Link to="/" className="mt-6 text-blue-600 underline underline-offset-4 hover:text-blue-800">
        Go home
      </Link>
    </section>
  )
}
