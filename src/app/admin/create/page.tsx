'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@/components/Editor';
import { FiArrowLeft, FiEye, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface PostData {
  heading: string; content: string; tags: string; authorName: string;
}

export default function CreatePostPage() {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({
    heading: '', content: '', tags: '', authorName: '',
  });

  useEffect(() => { setEditorLoaded(true); }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditorChange = (data: string) => {
    setPostData((prev) => ({ ...prev, content: data }));
  };

  // --- Preview Function (Stays the Same) ---
  const handlePreview = () => {
    const previewData = {
      heading: postData.heading,
      content: postData.content,
      authorName: postData.authorName,
    };
    try {
      localStorage.setItem('blogPostPreview', JSON.stringify(previewData));
      window.open('/admin/preview', '_blank');
    } catch (error) {
      console.error("Error saving preview data:", error);
      toast.error("Could not generate preview.");
    }
  };

  // --- Submit Function (Ensure this is correct) ---
  const handleSubmit = async () => {
    console.log("handleSubmit function was called!"); // Debug log

    if (!postData.heading) {
      return toast.error('Please enter a heading.');
    }
    setIsLoading(true);
    const toastId = toast.loading('Submitting your post...');

    const finalData = {
      ...postData,
      tags: postData.tags.split(',').map((tag) => tag.trim()).filter(tag => tag), // Also filter empty tags
    };

    try {
      const response = await fetch('/api/posts', { // Check this endpoint is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        toast.success('Post submitted successfully!', { id: toastId });
        setPostData({ heading: '', content: '', tags: '', authorName: '' }); // Clear form
      } else {
        // Log detailed error from backend if available
        const errorData = await response.json().catch(() => ({ message: 'Unknown server error' })); // Handle cases where response isn't JSON
        console.error("Backend Error:", response.status, errorData);
        toast.error(`Failed: ${errorData.message || response.statusText}`, { id: toastId });
      }
    } catch (error) {
      console.error('Network/Fetch Error:', error);
      toast.error('Network error. Could not submit post.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="flex justify-between items-center pb-4 border-b border-border mb-8">
        <h1 className="text-2xl font-bold text-text">Create a New Post</h1>
        <Link href="/" className="text-sm text-secondary hover:text-secondary/80 transition-colors">
          &larr; Back to Dashboard
        </Link>
      </header>

      <div className="space-y-6">
        {/* Heading Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft p-6">
          <label htmlFor="heading" className="text-sm font-medium text-text-light block mb-2">Title</label>
          <input
            id="heading" name="heading" value={postData.heading} onChange={handleInputChange}
            placeholder="Your Post Title"
            className="w-full text-2xl font-semibold bg-transparent outline-none placeholder:text-text-muted text-text"
          />
        </div>

        {/* Text Editor Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-medium text-text-light">Content</h3>
          </div>
          <Editor name="content" value={postData.content} onChange={handleEditorChange} editorLoaded={editorLoaded} />
        </div>
        
        {/* Details Card */}
        <div className="bg-surface border border-border rounded-xl shadow-soft p-6 space-y-6">
          <div>
            <label htmlFor="tags" className="text-sm font-medium text-text-light block mb-2">Tags</label>
            <input
              id="tags" name="tags" value={postData.tags} onChange={handleInputChange}
              placeholder="e.g. #webdev, #design"
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text placeholder:text-text-muted"
            />
          </div>
          <div>
            <label htmlFor="authorName" className="text-sm font-medium text-text-light block mb-2">Author Name</label>
            <input
              id="authorName" name="authorName" value={postData.authorName} onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-3 bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-secondary text-text placeholder:text-text-muted"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button // "Preview" button - calls handlePreview
            onClick={handlePreview}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-surface border border-border text-secondary text-lg font-semibold rounded-full shadow-soft transition-colors hover:bg-border hover:text-secondary/80"
          >
            <FiEye /> Preview
          </button>
          <button // "Publish Post" button - calls handleSubmit
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