'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

function Editor({ onChange, editorLoaded, name, value }: EditorProps) {
  const editorRef = useRef<any>(null);
 
  const [editorComponents, setEditorComponents] = useState<{ CKEditor: any; ClassicEditor: any } | null>(null);

  useEffect(() => {
    
    if (editorLoaded) {
      editorRef.current = {
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      };
      setEditorComponents(editorRef.current);
    }
  }, [editorLoaded]); 

  
  if (!editorLoaded || !editorComponents) {
    return (
      <div className="p-8 bg-surface border-2 border-dashed border-border rounded-lg text-center text-text-muted">
        Loading Editor...
      </div>
    );
  }

  
  const { CKEditor, ClassicEditor } = editorComponents;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default Editor;