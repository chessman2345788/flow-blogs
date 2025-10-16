import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-text">Flows Blog</h1>
        <Link
          href="/admin/create"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-xl shadow-button-primary transition-all duration-300 ease-in-out hover:bg-primary/90 hover:-translate-y-1"
        >
          <FiPlus className="transition-transform duration-300 group-hover:rotate-90" />
          Create Post
        </Link>
      </header>

      <main className="mt-8">
        {/* Recent Posts Section */}
        <h2 className="text-xl font-semibold text-text mb-4">Recent Posts</h2>
        <div className="flex items-center justify-center h-96 bg-surface border-2 border-dashed border-border rounded-lg">
          <p className="text-text-muted">Your published posts will appear here.</p>
        </div>
      </main>
    </div>
  );
}