'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { FiArrowLeft, FiEye, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface PostData {
  heading: string | number | readonly string[] | undefined;
  content: string;
  tags: string | number | readonly string[] | undefined;
  authorName: string | number | readonly string[] | undefined;
}

export default function CreatePostPage() {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({ /* ... */ });

  useEffect(() => { setEditorLoaded(true); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const handleEditorChange = (data: string) => { /* ... */ };
  const handleSubmit = async () => { /* Your submit logic */ };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="flex justify-between items-center pb-4 border-b border-border mb-8">
        <h1 className="text-2xl font-bold text-text">Create a New Post</h1>
        <Link href="/" className="text-sm text-secondary hover:text-secondary/80 transition-colors"> {/* "Back to Dashboard" in Cyan */}
          &larr; Back to Dashboard
        </Link>
      </header>

      <div className="space-y-6">
        {/* Heading Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft p-6">
          <label htmlFor="heading" className="text-sm font-medium text-text-light block mb-2">Title</label> {/* Label text lighter gray */}
          <input
            id="heading" name="heading" value={postData.heading} onChange={handleInputChange}
            placeholder="Your Post Title"
            className="w-full text-2xl font-semibold bg-transparent outline-none placeholder:text-text-muted text-text" // Placeholder dark gray, typed text white
          />
        </div>

        {/* Text Editor Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-light">Content</h3> {/* Label text lighter gray */}
          </div>
          <Editor name="content" value={postData.content} onChange={handleEditorChange} editorLoaded={editorLoaded} />
        </div>
        
        {/* Details Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft p-6 space-y-6">
          <div>
            <label htmlFor="tags" className="text-sm font-medium text-text-light block mb-2">Tags</label> {/* Label text lighter gray */}
            <input
              id="tags" name="tags" value={postData.tags} onChange={handleInputChange}
              placeholder=""
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text placeholder:text-text-muted" // Placeholder dark gray, typed text white
            />
          </div>
          <div>
            <label htmlFor="authorName" className="text-sm font-medium text-text-light block mb-2">Author Name</label> {/* Label text lighter gray */}
            <input
              id="authorName" name="authorName" value={postData.authorName} onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text placeholder:text-text-muted" // Placeholder dark gray, typed text white
            />
          </div>
        </div>
        
       
        <div className="flex items-center justify-end gap-4 pt-4">
          <button // "Preview" button in Cyan
            className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border text-secondary text-lg font-semibold rounded-full shadow-soft transition-colors hover:bg-border hover:text-secondary/80"
          >
            <FiEye /> Preview
          </button>
          <button 
            onClick={handleSubmit} disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background text-lg font-semibold rounded-full shadow-button-primary transition-all duration-300 hover:bg-primary/80 hover:-translate-y-1 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <FiSave />
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </main>
  );
}