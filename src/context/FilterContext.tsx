import React, { createContext, useContext, useState } from 'react';
import type { Filter } from '../types';

const FilterContext = createContext<{
  filter: Filter;
  setFilter: (filter: Filter) => void;
} | undefined>(undefined);

const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilterContext must be used within a FilterProvider');
  return context;
};

export default FilterProvider;
