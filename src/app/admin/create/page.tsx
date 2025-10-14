'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { FiArrowLeft, FiEye, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

// ... (Your interface and state logic can remain the same)
interface PostData { /* ... */ }

export default function CreatePostPage() {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({
    heading: '', content: '', tags: '', authorName: '',
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // ... (Your handler functions can remain the same)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const handleEditorChange = (data: string) => { /* ... */ };
  const handleSubmit = async () => { /* Your submit logic */ };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-border mb-8">
        <h1 className="text-2xl font-bold text-text">Flows Blog</h1>
        <Link href="/" className="text-sm text-text-muted hover:text-text transition-colors">
          &larr; Back to Dashboard
        </Link>
      </header>

      {/* Main Form - Vertical Card Layout */}
      <div className="space-y-8">
        
        {/* Heading Input - NO LABEL */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <input
            id="heading"
            name="heading"
            value={postData.heading}
            onChange={handleInputChange}
            placeholder="Enter the title of your blog post..."
            className="w-full text-2xl font-semibold bg-transparent outline-none placeholder:text-text-muted/50"
          />
        </div>

        {/* Text Editor Card */}
        <div className="bg-surface border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-muted">Text Editor</h3>
          </div>
          <Editor
            name="content"
            value={postData.content}
            onChange={handleEditorChange}
            editorLoaded={editorLoaded}
          />
        </div>
        
        {/* Tags Card */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <label htmlFor="tags" className="text-sm font-medium text-text-muted block mb-2">Tags</label>
          <input
            id="tags"
            name="tags"
            value={postData.tags}
            onChange={handleInputChange}
            placeholder="e.g. tech, news"
            className="w-full p-2 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Author Name Card */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <label htmlFor="authorName" className="text-sm font-medium text-text-muted block mb-2">Author Name</label>
          <input
            id="authorName"
            name="authorName"
            value={postData.authorName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="w-full p-2 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {/* Preview Button (Subtle) */}
          <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary/20 text-primary font-semibold rounded-lg transition-colors hover:bg-primary/30">
            <FiEye /> Preview
          </button>
          {/* Publish Button (Solid Blue with Hover) */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <FiSave />
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </main>
  );
}