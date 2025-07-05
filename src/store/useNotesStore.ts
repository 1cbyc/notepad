import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Note, NoteFormData, NoteFilters } from '@/types/note';

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  filters: NoteFilters;
  
  // Actions
  addNote: (noteData: NoteFormData) => void;
  updateNote: (id: string, noteData: Partial<NoteFormData>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  toggleArchive: (id: string) => void;
  updateFilters: (filters: Partial<NoteFilters>) => void;
  getActiveNote: () => Note | null;
  getFilteredNotes: () => Note[];
  getAllTags: () => string[];
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      filters: {
        search: '',
        tags: [],
        showArchived: false,
        showFavorites: false,
        sortBy: 'updatedAt',
        sortOrder: 'desc',
      },

      addNote: (noteData) => {
        const newNote: Note = {
          id: uuidv4(),
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags,
          color: noteData.color,
          isFavorite: false,
          isArchived: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }));
      },

      updateNote: (id, noteData) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  ...noteData,
                  updatedAt: new Date(),
                }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
        }));
      },

      setActiveNote: (id) => {
        set({ activeNoteId: id });
      },

      toggleFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
          ),
        }));
      },

      toggleArchive: (id) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isArchived: !note.isArchived } : note
          ),
        }));
      },

      updateFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      getActiveNote: () => {
        const { notes, activeNoteId } = get();
        return notes.find((note) => note.id === activeNoteId) || null;
      },

      getFilteredNotes: () => {
        const { notes, filters } = get();
        let filtered = notes;

        // Filter by search
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filtered = filtered.filter(
            (note) =>
              note.title.toLowerCase().includes(searchLower) ||
              note.content.toLowerCase().includes(searchLower) ||
              note.tags.some((tag) => tag.toLowerCase().includes(searchLower))
          );
        }

        // Filter by tags
        if (filters.tags.length > 0) {
          filtered = filtered.filter((note) =>
            filters.tags.some((tag) => note.tags.includes(tag))
          );
        }

        // Filter by archived status
        if (!filters.showArchived) {
          filtered = filtered.filter((note) => !note.isArchived);
        }

        // Filter by favorites
        if (filters.showFavorites) {
          filtered = filtered.filter((note) => note.isFavorite);
        }

        // Sort notes
        filtered.sort((a, b) => {
          let aValue: any = a[filters.sortBy];
          let bValue: any = b[filters.sortBy];

          if (filters.sortBy === 'title') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }

          if (filters.sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });

        return filtered;
      },

      getAllTags: () => {
        const { notes } = get();
        const tagSet = new Set<string>();
        notes.forEach((note) => {
          note.tags.forEach((tag) => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
      },
    }),
    {
      name: 'notes-storage',
      partialize: (state) => ({ notes: state.notes }),
    }
  )
); 