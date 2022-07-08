import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.scss'
import { faker } from '@faker-js/faker';
import axios from 'axios';
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
import { set } from 'lodash';

const API = process.env.API

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
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function Dashboard() {

    const [dao_list, setdao_list] = useState(null);
    const [g1, setg1] = useState({ labels: [], data: [] });

    const getDaoList = async () => {
        let res = await axios.get(`${API}/dao/get-dao-list?page=1&limit=999999`);
        setdao_list(res.data.results);
    }

    useEffect(() => {
        getDaoList();
    }, [])

    useEffect(() => {
        if (dao_list) {

            let sorted_date_list = dao_list.sort((a, b) => {
                let a_date = new Date(a.createdAt);
                let b_date = new Date(b.createdAt);
                a_date.setHours(0, 0, 0, 0);
                b_date.setHours(0, 0, 0, 0);
                return a_date - b_date
            });
            console.log([...new Set(sorted_date_list)])
        }
    }, [dao_list])

    console.log(g1)

    const data = {
        labels: g1.labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: g1.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3,
                fill: true
            },
        ],
    };

    return (
        <div className={styles.main}>
            <Line options={options} data={data} />
        </div>
    )
}
