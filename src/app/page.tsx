
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
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); 

 
  const createExcerpt = (htmlContent: string, maxLength = 100) => {
    
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    if (textContent.length <= maxLength) {
      return textContent;
    }
    return textContent.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
    
      <header className="flex justify-between items-center pb-4 border-b border-border dark:border-dark-border">
        <h1 className="text-2xl font-bold text-text dark:text-dark-text">Flows Blog</h1>
        <Link
          href="/admin/create"
          className="group inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:-translate-y-0.5"
        >
          <FiPlus className="transition-transform duration-300 group-hover:rotate-90" />
          Create Post
        </Link>
      </header>

      <main className="mt-8">
       
        <h2 className="text-xl font-semibold text-text dark:text-dark-text mb-4">Recent Posts</h2>

       
        {isLoading && (
          <div className="flex items-center justify-center h-60 bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg shadow-soft">
            <p className="text-text-muted dark:text-dark-text-muted">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-60 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg shadow-soft p-4">
            <p className="text-red-700 dark:text-red-300">Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <div className="flex items-center justify-center h-60 bg-surface dark:bg-dark-surface border-2 border-dashed border-border dark:border-dark-border rounded-lg shadow-soft">
            <p className="text-text-muted dark:text-dark-text-muted">No posts found. Create one!</p>
          </div>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-surface dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg shadow-soft overflow-hidden transition-transform hover:-translate-y-1"
              >
               
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2 line-clamp-2">
                    {post.heading}
                  </h3>
                  <p className="text-sm text-text-muted dark:text-dark-text-muted mb-4 line-clamp-3">
                    {createExcerpt(post.content)}
                  </p>
                  <div className="flex justify-between items-center text-xs text-text-muted dark:text-dark-text-muted">
                    <span>By {post.authorName || 'Admin'}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}