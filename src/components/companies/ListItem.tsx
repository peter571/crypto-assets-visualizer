import React from 'react'
import { useCoinsData } from '../../contexts/CoinsContext'

export default function ListItem(props: any) {
  const { setSelectedAsset, fetchCoinData, selectedAsset } = useCoinsData();

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

// ath: 69045
// ​​
// ath_change_percentage: -75.02895
// ​​
// ath_date: "2021-11-10T14:24:11.849Z"
// ​​
// atl: 67.81
// ​​
// atl_change_percentage: 25326.13407
// ​​
// atl_date: "2013-07-06T00:00:00.000Z"
// ​​
// circulating_supply: 19228925
// ​​
// current_price: 17119.16
// ​​
// fully_diluted_valuation: 360957466625
// ​​
// high_24h: 17309.57
// ​​
// id: "bitcoin"
// ​​
// image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
// ​​
// last_updated: "2022-12-09T13:36:10.700Z"
// ​​
// low_24h: 16831.65
// ​​
// market_cap: 330515431139
// ​​
// market_cap_change_24h: 6852724426
// ​​
// market_cap_change_percentage_24h: 2.11724
// ​​
// market_cap_rank: 1
// ​​
// max_supply: 21000000
// ​​
// name: "Bitcoin"
// ​​
// price_change_24h: 263.1
// ​​
// price_change_percentage_24h: 1.56086
// ​​
// roi: null
// ​​

