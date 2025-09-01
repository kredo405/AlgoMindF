import { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartData,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface PriceChartProps {
  selectedPairs: string[];
}

interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

const availablePairs: TradingPair[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: 51250, change24h: 2.5, volume: 28500000000, marketCap: 1005000000000 },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: 2850, change24h: 1.8, volume: 15200000000, marketCap: 342000000000 },
  { symbol: 'SOL/USDT', name: 'Solana', price: 102.50, change24h: 5.2, volume: 3800000000, marketCap: 44200000000 },
  { symbol: 'XRP/USDT', name: 'Ripple', price: 0.58, change24h: -0.7, volume: 1850000000, marketCap: 31200000000 },
  { symbol: 'ADA/USDT', name: 'Cardano', price: 0.55, change24h: 1.2, volume: 950000000, marketCap: 19500000000 },
];

export default function PriceChart({ selectedPairs }: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

  useEffect(() => {
    generateChartData(selectedPairs);
  }, [selectedPairs]);

  const generateChartData = (pairs: string[]) => {
    if (pairs.length === 0) return;
    
    const now = Date.now();
    const data = {
      datasets: pairs.map((pair, index) => {
        const baseValue = availablePairs.find(p => p.symbol === pair)?.price || 100;
        const multiplier = 1 + (index * 0.1);
        const color = `hsl(${index * 60}, 70%, 50%)`;
        
        return {
          label: pair,
          data: Array.from({ length: 24 }, (_, i) => ({
            x: (now - (23 - i) * 3600000),
            y: baseValue * multiplier * (1 + Math.sin(i / 2) * 0.05)
          })),
          borderColor: color,
          backgroundColor: `${color}20`,
          tension: 0.4,
          fill: false,
        };
      })
    };
    
    setChartData(data);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'График цен',
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'hour' as const,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <Typography>Выберите торговые пары для отображения графиков</Typography>
        </Box>
      )}
    </Paper>
  );
}