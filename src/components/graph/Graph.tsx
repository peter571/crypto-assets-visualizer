import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SlCalender } from 'react-icons/sl'
import { useCoinsData } from '../../contexts/CoinsContext';
import { Last7Days, options, Last7DaysWithYear } from '../../utils/util';

const priceChangesOptions = ["1h", "24h", "7d", "14d", "30d", "200d", "1y"];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Graph() {
    const { selectedAsset } = useCoinsData();
    const [price_change_percentage, setPercentage] = useState("1h")
    const [price_change_percentage_7d, setPercentage7d] = useState("")
    const [prices, setPrices] = useState([])
    const [percentageChange, setPercentageChange] = useState("")
    const [price, setPrice] = useState("")
    const [xlabels, setLabels] = useState<any[]>([])

    useEffect(() => {
        if (selectedAsset.coinName) {
            setPrices(selectedAsset.asset.market_data.sparkline_7d.price);
            setPrice(new Intl.NumberFormat().format(selectedAsset.asset.market_data.current_price.usd));
            setPercentage7d(selectedAsset.asset.market_data["price_change_percentage_7d"]);
        }
    }, [selectedAsset])

    useEffect(() => {
        if (selectedAsset.coinName) {
            setPercentageChange(selectedAsset.asset.market_data[`price_change_percentage_${price_change_percentage}_in_currency`].usd)
        }
    }, [price_change_percentage, selectedAsset])

    useEffect(() => {
        setLabels(Last7Days())
    }, [])

    const handleChange = (e: React.ChangeEvent<any>) => {
        setPercentage(e.target.value);
    }

    const dateLabels = Last7DaysWithYear();

    const data = {
        labels: xlabels,
        datasets: [
            {
                label: '',
                data: prices,
                borderColor: `${Number(price_change_percentage_7d) > 0 ? 'green' : 'red'}`,
                backgroundColor: `${Number(price_change_percentage_7d) > 0 ? 'green' : 'red'}`,
                fill: true,
                tension: 0.5,
                pointBorderWidth: 1
            }
        ],
    };

    return (
        <div className='graph'>
            <div className='nav-wrapper'>
                <h1 className='selected-stock'>{selectedAsset.coinName}</h1>
                <div className='calender-wrapper'>
                    <SlCalender size={24} className='calender-icon' />
                    <button className='date-btn' disabled>
                        {`${dateLabels[6]} - ${dateLabels[0]}`}
                    </button>
                </div>
            </div>

            <div className='closing-price-wrapper'>
                <span className='price'>${price}</span>
                <div className='price-change-wrapper'>
                    <span className={`${Number(percentageChange) > 0 ? 'percentagechange' : 'negative-price-change'}`}>{percentageChange}%</span>
                    <select onChange={handleChange} name="pricechanges" id="pricechanges">
                        {priceChangesOptions.map((el, index) => (
                            <option key={index} value={el}>{el}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='graph-wrapper'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}
