'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { FiArrowLeft, FiEye, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface PostData {
  heading: string;
  content: string;
  tags: string;
  authorName: string;
}

export default function CreatePostPage() {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({
    heading: '', content: '', tags: '', authorName: '',
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // This is the function that allows you to type in the inputs.
  // It correctly updates the state.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (data: string) => {
    setPostData((prev) => ({ ...prev, content: data }));
  };

  const handleSubmit = async () => { /* Your submit logic */ };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="flex justify-between items-center pb-4 border-b border-border mb-8">
        <h1 className="text-2xl font-bold text-text">Create a New Post</h1>
        <Link href="/" className="text-sm text-text-muted hover:text-text transition-colors">
          &larr; Back to Dashboard
        </Link>
      </header>

      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-lg shadow-soft p-6">
          <label htmlFor="heading" className="text-sm font-medium text-text-muted block mb-2">Title</label>
          <input
            id="heading"
            name="heading" // The 'name' property is crucial for the handler to work.
            value={postData.heading} // The input's value is tied to the state.
            onChange={handleInputChange} // This function is called every time you type.
            placeholder="Your Post Title"
            className="w-full text-2xl font-semibold bg-transparent outline-none placeholder:text-text-muted/50"
          />
        </div>

        <div className="bg-surface border border-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-muted">Content</h3>
          </div>
          <Editor name="content" value={postData.content} onChange={handleEditorChange} editorLoaded={editorLoaded} />
        </div>
        
        <div className="bg-surface border border-border rounded-lg shadow-soft p-6 space-y-6">
          <div>
            <label htmlFor="tags" className="text-sm font-medium text-text-muted block mb-2">Tags</label>
            <input
              id="tags" name="tags" value={postData.tags} onChange={handleInputChange}
              placeholder="e.g. #webdev, #design, #tutorial"
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text"
            />
          </div>
          <div>
            <label htmlFor="authorName" className="text-sm font-medium text-text-muted block mb-2">Author Name</label>
            <input
              id="authorName" name="authorName" value={postData.authorName} onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-4 pt-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border text-text-muted text-lg font-semibold rounded-full shadow-soft transition-colors hover:bg-border hover:text-text">
            <FiEye /> Preview
          </button>
          <button
            onClick={handleSubmit} disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-full shadow-button-primary transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            <FiSave />
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </div>
    </main>
  );
}