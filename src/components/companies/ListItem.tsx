import React from 'react'
import { useCoinsData } from '../../contexts/CoinsContext'

export default function ListItem(props: any) {
  const { setSelectedAsset, fetchCoinData } = useCoinsData();

  const handleOnClickItem = async () => {
    const coinData = await fetchCoinData(props.id)
    setSelectedAsset({ coinName: props.name, asset: coinData });
  }

  return (
    <div onClick={handleOnClickItem} id='asset-item'>
      <img className='' src={props.image.replace(/\?.*/, '')} alt={props.id} />
      <h1 className='list-item'>{props.name}</h1>
    </div>
  )
}
