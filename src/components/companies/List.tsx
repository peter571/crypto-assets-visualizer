import React from 'react'
import ListItem from './ListItem'
import SearchBar from './SearchBar'

export default function List() {

    const CompaniesList = () => {
        return (
            <div className='companies-list'>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        )
    }
    return (
        <div className='list'>
            <h1 className='app-title'>Nasdaq</h1>
            <SearchBar />
            <CompaniesList />
        </div>
    )
}
