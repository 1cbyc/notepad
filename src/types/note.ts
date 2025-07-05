export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tags: string[];
  color?: string;
}

export interface NoteFilters {
  search: string;
  tags: string[];
  showArchived: boolean;
  showFavorites: boolean;
  sortBy: 'updatedAt' | 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
} 