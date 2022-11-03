import React, { useState } from 'react'
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
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem: any) {
                return tooltipItem.yLabel;
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: true
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
            display: false,
            text: 'Stock Prices Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const utils = [4, 6, 4, 5, 6, 2, 3];
export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: utils.map((el) => Math.floor(Math.random() * 50) * el),
            borderColor: 'rgba(0, 0, 0, 1)',
            backgroundColor: 'transparent',
            tension: 0.3

        }
    ],
};

export default function Graph() {
    const [show, setShow] = useState(false);

    return (
        <div className='graph'>
            <div className='nav-wrapper'>
                <h1 className='selected-stock'>Tezos</h1>
                <div className='calender-wrapper'>
                    <SlCalender size={24} className='calender-icon' />
                    <button className='date-btn' disabled>
                        Jun 5, 1998 - Dec 31, 2018
                    </button>
                </div>
            </div>
            <div className='closing-price-wrapper'>
                <button
                    className='closing-price-btn'
                    onClick={() => setShow(prev => !prev)}>
                    Closing price
                    {show ?
                        <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
                <div
                    className='close-price-display'
                    style={{ visibility: show ? 'visible' : 'hidden' }}>
                    <p className='price-txt'>Closing Price</p>
                    <p className='price-txt'>Adj. Closing Price</p>
                </div>
            </div>
            <div className='graph-wrapper'>
            <Line data={data} options={options} />
            </div>
        </div>
    )
}
