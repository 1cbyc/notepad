'use client';

import { motion } from 'framer-motion';
import { FileText, Plus, Sparkles } from 'lucide-react';
import { useNotesStore } from '@/store/useNotesStore';

export default function EmptyState() {
  const { addNote } = useNotesStore();

  const handleCreateNote = () => {
    addNote({
      title: 'Untitled Note',
      content: '',
      tags: [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex items-center justify-center bg-white dark:bg-slate-800"
    >
      <div className="text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center"
        >
          <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2"
        >
          Welcome to Notepad
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
        >
          Select a note from the sidebar or create a new one to get started. 
          Your notes support markdown formatting and are automatically saved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={handleCreateNote}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create Your First Note
          </button>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Markdown Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Auto Save</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Tags & Search</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 