'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Grid3X3, List, Settings } from 'lucide-react';
import { useNotesStore } from '@/store/useNotesStore';
import Sidebar from '@/components/Sidebar';
import NoteEditor from '@/components/NoteEditor';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const { getActiveNote, getFilteredNotes } = useNotesStore();
  
  const activeNote = getActiveNote();
  const filteredNotes = getFilteredNotes();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notepad
            </h1>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          <SearchBar />
          
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-slate-600 shadow-sm' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-slate-600 shadow-sm' 
                    : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-b border-slate-200 dark:border-slate-700"
            >
              <FilterPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar viewMode={viewMode} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <NoteEditor />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
