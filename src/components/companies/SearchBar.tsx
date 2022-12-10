import React from 'react'
import { useCoinsData } from '../../contexts/CoinsContext';

export default function SearchBar() {
  const { handleSearch } = useCoinsData();
  return (
    <div>
      <input className='search-bar' type="text" onChange={handleSearch} placeholder='Type here to search' />
    </div>
  )
}
