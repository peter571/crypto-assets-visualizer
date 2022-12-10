import React from 'react'
import { useCoinsData } from '../../contexts/CoinsContext'
import ListItem from './ListItem'
import SearchBar from './SearchBar'

export default function List() {

    const { searchTerm, assets, filteredAssets } = useCoinsData();

    const FilteredList = () => {
        return (
            <div className='companies-list'>
                {filteredAssets.length === 0 ? (
                    <span>No assets found...</span>
                ) : (
                    <>
                        {filteredAssets.map((asset, index) => (
                            <ListItem key={index} {...asset} />
                        ))}
                    </>
                )}
            </div>
        )
    }

    const CompaniesList = () => {
        return (
            <div className='companies-list'>
                {assets.map((asset, index) => (
                    <ListItem key={index} {...asset} />
                ))}
            </div>
        )
    }
    return (
        <div className='list'>
            <h1 className='app-title'>Crypto Graphs</h1>
            <SearchBar />
            {searchTerm === "" ? (
                <CompaniesList />
            ) : (
                <FilteredList />
            )}
        </div>
    )
}
