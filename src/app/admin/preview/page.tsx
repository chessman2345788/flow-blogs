'use client';
import { useState, useEffect } from 'react';

interface PreviewData { heading: string; content: string; authorName?: string; }

export default function PreviewPage() {
  const [post, setPost] = useState<PreviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('blogPostPreview');
    if (storedData) { try { setPost(JSON.parse(storedData)); } catch (err) { setError("Could not load preview data."); } }
    else { setError("No preview data found."); }
  }, []);

  if (error) { return <div className="p-4 text-red-400">{error}</div>; }
  if (!post) { return <div className="p-4 text-text-light">Loading preview...</div>; }

  return (
    <article className="max-w-3xl mx-auto p-6 sm:p-8 my-8 prose prose-invert lg:prose-xl bg-surface border border-border rounded-lg shadow-soft text-text">
      <h1 className="!text-text">{post.heading}</h1>
      {post.authorName && <p className="!text-text-light">By {post.authorName}</p>}
      <div className="text-text" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}