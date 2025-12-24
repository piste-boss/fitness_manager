import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';
import { Save } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);

export default function WeightPage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [weight, setWeight] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [goalWeight, setGoalWeight] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // 1. Load Goal
        const savedGoal = JSON.parse(localStorage.getItem('userGoal') || '{}');
        if (savedGoal.weight) {
            setGoalWeight(parseFloat(savedGoal.weight));
        }

        // 2. Load Weight Records
        const savedWeights = JSON.parse(localStorage.getItem('weightRecords') || '{}');

        // 3. Load Calorie Records (from Meal.jsx)
        const savedCalories = JSON.parse(localStorage.getItem('dailyCalories') || '{}');

        // 4. Prepare Chart Data (Last 7 days for demo, or last 30 realistic)
        // Generating last 7 days labels
        const labels = [];
        const weightData = [];
        const calorieData = [];

        // Simple logic: Show last 7 days + today
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            labels.push(dateStr.slice(5).replace('-', '/')); // MM/DD format

            weightData.push(savedWeights[dateStr] || null);
            calorieData.push(savedCalories[dateStr] || null);
        }

        setChartData({
            labels,
            datasets: [
                {
                    label: '体重 (kg)',
                    data: weightData,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                    type: 'line',
                    tension: 0.3
                },
                {
                    label: '摂取カロリー (kcal)',
                    data: calorieData,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    yAxisID: 'y1',
                    type: 'bar'
                }
            ]
        });
    };

    const handleSave = () => {
        if (!weight) return;

        const savedWeights = JSON.parse(localStorage.getItem('weightRecords') || '{}');
        savedWeights[date] = parseFloat(weight);
        localStorage.setItem('weightRecords', JSON.stringify(savedWeights));

        alert('記録しました');
        setWeight('');
        loadData(); // Refresh chart
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: '体重とカロリーの推移',
            },
            annotation: {
                annotations: goalWeight ? {
                    line1: {
                        type: 'line',
                        yMin: goalWeight,
                        yMax: goalWeight,
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        label: {
                            content: '目標体重',
                            display: true,
                            position: 'end'
                        }
                    }
                } : {}
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: '体重 (kg)'
                },
                suggestedMin: goalWeight ? goalWeight - 5 : 40,
                suggestedMax: goalWeight ? goalWeight + 10 : 80
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'カロリー (kcal)'
                },
                suggestedMax: 3000
            },
        },
    };

    return (
        <div className="container">
            <div className="page-header">
                <h1 className="page-title">体重記録</h1>
            </div>

            <div className="card">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">日付</label>
                        <input
                            type="date"
                            className="form-input"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className="form-label">体重 (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="form-input"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="0.0"
                        />
                    </div>
                    <button
                        className="btn-primary"
                        style={{ width: 'auto', padding: '14px', borderRadius: '8px' }}
                        onClick={handleSave}
                    >
                        <Save size={24} />
                    </button>
                </div>

                <div style={{ height: '300px', width: '100%' }}>
                    <Line options={options} data={chartData} />
                </div>
            </div>
        </div>
    );
}
