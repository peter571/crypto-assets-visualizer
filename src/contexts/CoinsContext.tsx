import React, { ReactNode, useContext, useEffect, useState } from "react";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true";

interface selectedAssetProp {
    coinName: string;
    asset: any;
}

interface Coins {
    assets: any[];
    filteredAssets: any[];
    handleSearch: (e: React.ChangeEvent<any>) => void;
    searchTerm: string;
    selectedAsset: selectedAssetProp;
    setSelectedAsset: React.Dispatch<React.SetStateAction<selectedAssetProp>>;
    fetchCoinData: (id: string) => Promise<any>;
}

const CoinsContext = React.createContext<Coins>({} as Coins)

export const useCoinsData = () => {
    return useContext(CoinsContext);
}

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAsset, setSelectedAsset] = useState<selectedAssetProp>({ coinName: "", asset: {} });

    useEffect(() => {
        (async function(){
            const results = await (await fetch(`${API_URL}`)).json();
            setAssets(results)
            if (results.length > 0) {
                const coinData = await fetchCoinData(results[0].id);
                setSelectedAsset({ coinName: results[0].name, asset: coinData });
            }
        })()
    }, []);

    useEffect(() => {
        if (searchTerm !== "") {
            setFilteredAssets(assets.filter((asset: any) => {
                return asset.name.toLowerCase().includes(searchTerm.toLowerCase());
            }))
        }
    }, [searchTerm])

    const handleSearch = (e: React.ChangeEvent<any>) => {
        setSearchTerm(e.target.value);
    }

    const fetchCoinData = async (id: string) => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
        const result = await (await fetch(`${url}`)).json();
        return result;
    }

    return (
        <CoinsContext.Provider value={{assets, selectedAsset, fetchCoinData, setSelectedAsset, handleSearch, filteredAssets, searchTerm}}>
            {children}
        </CoinsContext.Provider>
    )
}