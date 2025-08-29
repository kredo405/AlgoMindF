import { Paper, Typography, Box } from '@mui/material';

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

export default function TradingPairsList() {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Доступные пары
      </Typography>
      {availablePairs.map((pair) => (
        <Box key={pair.symbol} sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          py: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Box>
            <Typography variant="body1">{pair.symbol}</Typography>
            <Typography variant="caption" color="textSecondary">
              {pair.name}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1">${pair.price.toLocaleString()}</Typography>
            <Typography 
              variant="caption" 
              color={pair.change24h >= 0 ? 'success.main' : 'error.main'}
            >
              {pair.change24h >= 0 ? '+' : ''}{pair.change24h}%
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}