// src/app/admin/preview/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Define the structure of the data we expect from localStorage
interface PreviewData {
  heading: string;
  content: string;
  authorName?: string; // Optional author name
}

export default function PreviewPage() {
  const [post, setPost] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This runs only on the client-side after the page loads
    const storedData = localStorage.getItem('blogPostPreview');
    if (storedData) {
      try {
        const parsedData: PreviewData = JSON.parse(storedData);
        setPost(parsedData);
        // Optional: remove the item after reading it
        // localStorage.removeItem('blogPostPreview');
      } catch (err) {
        console.error("Error parsing preview data:", err);
        setError("Could not load preview data.");
      }
    } else {
      setError("No preview data found.");
    }
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen text-text-muted">
        Loading preview...
      </div>
    );
  }

  return (
    // Apply Tailwind Typography for basic blog styling
    // prose-invert applies dark mode styles automatically if html.dark exists
    <article className="max-w-3xl mx-auto p-4 sm:p-8 my-8 prose prose-invert lg:prose-xl bg-surface border border-border rounded-lg shadow-soft text-text">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 !text-text">{post.heading}</h1>
      {/* Author - CORRECTED: Comment removed from inside the parentheses */}
      {post.authorName && (
        <p className="text-sm !text-text-muted mb-6">By {post.authorName}</p>
      )}
      {/* Content rendered from HTML */}
      {/* Apply text color to content wrapper */}
      <div className="text-text" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}