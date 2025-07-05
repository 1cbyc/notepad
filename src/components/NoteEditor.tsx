'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Tag, Palette, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNotesStore } from '@/store/useNotesStore';
import TagInput from './TagInput';
import ColorPicker from './ColorPicker';

export default function NoteEditor() {
  const { getActiveNote, updateNote } = useNotesStore();
  const activeNote = getActiveNote();
  const [showPreview, setShowPreview] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setTags(activeNote.tags);
      setColor(activeNote.color || '');
    }
  }, [activeNote]);

  useEffect(() => {
    if (activeNote) {
      const timeoutId = setTimeout(() => {
        updateNote(activeNote.id, {
          title,
          content,
          tags,
          color,
        });
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [title, content, tags, color, activeNote, updateNote]);

  if (!activeNote) {
    return null;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setShowColorPicker(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Note title..."
            className="text-xl font-semibold bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          <div className="flex items-center gap-2">
            {color && (
              <div
                className="w-4 h-4 rounded-full border border-slate-200 dark:border-slate-600"
                style={{ backgroundColor: color }}
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Change color"
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title={showPreview ? 'Hide preview' : 'Show preview'}
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 border-b border-slate-200 dark:border-slate-700"
        >
          <ColorPicker selectedColor={color} onColorChange={handleColorChange} />
        </motion.div>
      )}

      {/* Tags */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-slate-500" />
          <TagInput tags={tags} onChange={handleTagsChange} />
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="flex-1 flex">
        {/* Editor */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} flex flex-col`}>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your note... (Markdown supported)"
            className="flex-1 p-6 resize-none bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 font-mono text-sm leading-relaxed"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-1/2 border-l border-slate-200 dark:border-slate-700 overflow-y-auto"
          >
            <div className="p-6 prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc list-inside text-slate-700 dark:text-slate-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal list-inside text-slate-700 dark:text-slate-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1 text-slate-700 dark:text-slate-300">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 italic text-slate-600 dark:text-slate-400 mb-4">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg overflow-x-auto mb-4">
                      <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
                        {children}
                      </code>
                    </pre>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-slate-700 dark:text-slate-300">
                      {children}
                    </em>
                  ),
                }}
              >
                {content || '*No content to preview*'}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 