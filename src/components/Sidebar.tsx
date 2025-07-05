'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Archive, Trash2, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { useNotesStore } from '@/store/useNotesStore';
import { Note } from '@/types/note';

interface SidebarProps {
  viewMode: 'list' | 'grid';
}

export default function Sidebar({ viewMode }: SidebarProps) {
  const {
    notes,
    activeNoteId,
    setActiveNote,
    addNote,
    deleteNote,
    toggleFavorite,
    toggleArchive,
    getFilteredNotes,
  } = useNotesStore();

  const filteredNotes = getFilteredNotes();

  const handleAddNote = () => {
    addNote({
      title: 'Untitled Note',
      content: '',
      tags: [],
    });
  };

  const handleNoteClick = (noteId: string) => {
    setActiveNote(noteId);
  };

  const handleDeleteNote = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    deleteNote(noteId);
  };

  const handleToggleFavorite = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    toggleFavorite(noteId);
  };

  const handleToggleArchive = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    toggleArchive(noteId);
  };

  const renderNoteItem = (note: Note) => (
    <motion.div
      key={note.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 cursor-pointer border-b border-slate-100 dark:border-slate-700 transition-all ${
        activeNoteId === note.id
          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
      }`}
      onClick={() => handleNoteClick(note.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate flex-1">
          {note.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => handleToggleFavorite(e, note.id)}
            className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${
              note.isFavorite ? 'text-yellow-500' : 'text-slate-400'
            }`}
          >
            <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => handleToggleArchive(e, note.id)}
            className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${
              note.isArchived ? 'text-orange-500' : 'text-slate-400'
            }`}
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => handleDeleteNote(e, note.id)}
            className="p-1 rounded hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
        {note.content || 'No content'}
      </p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        <span>{format(note.updatedAt, 'MMM d, yyyy')}</span>
        {note.isFavorite && <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />}
        {note.isArchived && <Archive className="w-3 h-3 text-orange-500" />}
      </div>
    </motion.div>
  );

  const renderGridItem = (note: Note) => (
    <motion.div
      key={note.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={`p-4 cursor-pointer rounded-lg border transition-all group ${
        activeNoteId === note.id
          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
      onClick={() => handleNoteClick(note.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate flex-1">
          {note.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => handleToggleFavorite(e, note.id)}
            className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ${
              note.isFavorite ? 'text-yellow-500' : 'text-slate-400'
            }`}
          >
            <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => handleDeleteNote(e, note.id)}
            className="p-1 rounded hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-3">
        {note.content || 'No content'}
      </p>

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
              +{note.tags.length - 2}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
        <span>{format(note.updatedAt, 'MMM d')}</span>
        <div className="flex items-center gap-1">
          {note.isFavorite && <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />}
          {note.isArchived && <Archive className="w-3 h-3 text-orange-500" />}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Add Note Button */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={handleAddNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Note
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <p className="text-lg font-medium mb-2">No notes found</p>
            <p className="text-sm">Create your first note to get started</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {viewMode === 'list' ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredNotes.map(renderNoteItem)}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 p-4">
                {filteredNotes.map(renderGridItem)}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
} 