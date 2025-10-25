'use client'; 
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { useState, useEffect } from 'react';


interface BlogPost {
  _id: string;
  heading: string;
  content: string;
  authorName?: string;
  createdAt: string; 
  tags?: string[];
}

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); setError(null);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          let errorMsg = 'Failed to fetch posts';
          try { const errData = await response.json(); errorMsg = errData.message || errorMsg; } catch (_) {}
          throw new Error(errorMsg);
        }
        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) { setError((err as Error).message); console.error(err); }
      finally { setIsLoading(false); }
    };
    fetchPosts();
  }, []); 

 
  const createExcerpt = (html: string, len = 100) => html.replace(/<[^>]*>/g, '').substring(0, len) + (html.length > len ? '...' : '');

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <header className="flex justify-between items-center pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-text">Flows Blog</h1>
        <Link
          href="/admin/create"
          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-semibold rounded-xl shadow-button-primary transition-all hover:bg-primary/80 hover:-translate-y-1"
        >
          <FiPlus className="group-hover:rotate-90 transition-transform" /> Create Post
        </Link>
      </header>

      <main className="mt-8">
        <h2 className="text-xl font-semibold text-text mb-4">Recent Posts</h2>
        {isLoading && <div className="text-center p-10 text-text-light">Loading posts...</div>}
        {error && <div className="text-center p-10 text-red-400">Error: {error}</div>}
        {!isLoading && !error && posts.length === 0 && (
          <div className="flex items-center justify-center h-60 bg-surface border-2 border-dashed border-border rounded-lg shadow-soft"><p className="text-text-light">No posts found.</p></div>
        )}
        {!isLoading && !error && posts.length > 0 && (
          // Display fetched posts as linked cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post._id}`} passHref>
                <div className="bg-surface border border-border rounded-lg shadow-soft overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer h-full flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">{post.heading}</h3>
                    <p className="text-sm text-text-light mb-4 line-clamp-3">{createExcerpt(post.content)}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-text-light pt-2 border-t border-border mt-auto">
                    <span>By {post.authorName || 'Admin'}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}