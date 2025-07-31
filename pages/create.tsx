import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
            className="form-input"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            value={content}
            className="form-textarea"
          />
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={!content || !title}
              className="submit-button"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        h1 {
          margin-bottom: 1.5rem;
        }
        
        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .form-textarea {
          min-height: 200px;
          resize: vertical;
        }
        
        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #642f8dff;
          box-shadow: 0 0 0 1px #642f8dff;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .submit-button {
          background: #642f8dff;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .submit-button:hover {
          background:  #642f8dff;
        }
        
        .submit-button:disabled {
          background: #d5c2dcff;
          cursor: not-allowed;
        }
        
        .cancel-button {
          background: transparent;
          color:  #642f8dff;
          border: 1px solid #642f8dff;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .cancel-button:hover {
          background: #d5c2dcff;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;