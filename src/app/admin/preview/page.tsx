
'use client';

import { useState, useEffect } from 'react';


interface PreviewData {
  heading: string;
  content: string;
  authorName?: string; 
}

export default function PreviewPage() {
  const [post, setPost] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const storedData = localStorage.getItem('blogPostPreview');
    if (storedData) {
      try {
        const parsedData: PreviewData = JSON.parse(storedData);
        setPost(parsedData);
       
      } catch (err) {
        console.error("Error parsing preview data:", err);
        setError("Could not load preview data.");
      }
    } else {
      setError("No preview data found.");
    }
  }, []); 

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
    
   
    <article className="max-w-3xl mx-auto p-4 sm:p-8 my-8 prose prose-invert lg:prose-xl bg-surface border border-border rounded-lg shadow-soft text-text">
     
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 !text-text">{post.heading}</h1>
     
      {post.authorName && (
        <p className="text-sm !text-text-muted mb-6">By {post.authorName}</p>
      )}
    
      <div className="text-text" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}