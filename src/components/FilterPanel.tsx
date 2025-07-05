'use client';

import { Star, Archive, Tag, SortAsc, SortDesc } from 'lucide-react';
import { useNotesStore } from '@/store/useNotesStore';

export default function FilterPanel() {
  const { filters, updateFilters, getAllTags } = useNotesStore();
  const allTags = getAllTags();

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  const handleSortChange = (sortBy: 'updatedAt' | 'createdAt' | 'title') => {
    updateFilters({ sortBy });
  };

  const handleSortOrderToggle = () => {
    updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Quick Filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateFilters({ showFavorites: !filters.showFavorites })}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            filters.showFavorites
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Star className="w-4 h-4" />
          Favorites
        </button>
        <button
          onClick={() => updateFilters({ showArchived: !filters.showArchived })}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            filters.showArchived
              ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
              : 'hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Archive className="w-4 h-4" />
          Archived
        </button>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Sort by
          </span>
          <button
            onClick={handleSortOrderToggle}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            {filters.sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="flex gap-2">
          {[
            { key: 'updatedAt', label: 'Modified' },
            { key: 'createdAt', label: 'Created' },
            { key: 'title', label: 'Title' },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => handleSortChange(option.key as any)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                filters.sortBy === option.key
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.tags.length > 0 || filters.showFavorites || filters.showArchived) && (
        <button
          onClick={() =>
            updateFilters({
              search: '',
              tags: [],
              showFavorites: false,
              showArchived: false,
            })
          }
          className="w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
} 