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
import { IoIosArrowDown, IoIosArrowUp, } from 'react-icons/io'
import { useCoinsData } from '../../contexts/CoinsContext';

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

export const options = {
    layout: {
        padding: 15
    },
    aspectRatio: 2.4,
    maintainAspectRatio: true,
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem: any) {
                return tooltipItem.xLabel;
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                callback: function (value: any, index: any, values: any) {
                    return '';
                }
            }
        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                callback: function (value: any, index: any, values: any) {
                    return '';
                }
            }
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Last 7 days Prices',
        },
    },
};

const labels = ['', '', '', '', '', '', ''];

export default function Graph() {
    const { selectedAsset } = useCoinsData();
    const [price_change_percentage, setPercentage] = useState("1h")

    useEffect(() => {
        if (selectedAsset.coinName) {
            console.log(selectedAsset.asset.market_data.sparkline_7d.price)
        }
    }, [selectedAsset])

    const handleChange = (e: React.ChangeEvent<any>) => {
        setPercentage(e.target.value);
    }

    const price = new Intl.NumberFormat().format(selectedAsset.asset.market_data.current_price.usd);
    const percentageChange = selectedAsset.asset.market_data[`price_change_percentage_${price_change_percentage}_in_currency`].usd;
    const prices = selectedAsset.asset.market_data.sparkline_7d.price;

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: prices,
                borderColor: 'rgba(0, 0, 0, 1)',
                backgroundColor: 'transparent',
                tension: 0.3

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
                        Jun 5, 1998 - Dec 31, 2018
                    </button>
                </div>
            </div>
            <div className='prices-wrapper'>
                <span className='price'>${price}</span>
                <span className={`${Number(percentageChange) > 0 ? 'percentagechange' : 'negative-price-change'}`}>{percentageChange}</span>
            </div>
            <div className='closing-price-wrapper'>

                <select onChange={handleChange} name="pricechanges" id="pricechanges">
                    {priceChangesOptions.map((el, index) => (
                        <option key={index} value={el}>{el}</option>
                    ))}
                </select>
            </div>
            <div className='graph-wrapper'>
                <Line data={data} options={options} />
            </div>
        </div>
    )
}
