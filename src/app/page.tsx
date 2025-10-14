import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-text"> Manchester Blogs</h1>
        <Link
          href="/admin/create"
          className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:-translate-y-0.5"
        >
          <FiPlus className="transition-transform duration-300 group-hover:rotate-90" />
          Create Post
        </Link>
      </header>

      <main className="mt-8">
        {/* Section Header (matches your wireframe) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text">Recent Posts</h2>
        </div>

        {/* Dynamic Blog Cards Placeholder */}
        <div className="flex items-center justify-center h-96 bg-surface border-2 border-dashed border-border rounded-lg">
          <p className="text-text-muted">Your published posts will appear here.</p>
        </div>
      </main>
    </div>
  );
}