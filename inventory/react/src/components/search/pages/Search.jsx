import React from 'react'

import { SearchFilter } from './SearchFilter';
import { SearchPagging } from './SearchPagging';

export const Search = ({children, useSearch, fastsearch}) => {
 
  return (
    <div>
      {children} 
      <SearchPagging useSearch = {useSearch}/> 
    </div>
  )
}
