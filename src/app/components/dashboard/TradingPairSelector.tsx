import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Chip, Box, Button } from '@mui/material';

interface TradingPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
}

interface TradingPairSelectorProps {
  selectedPairs: string[];
  onPairChange: (pairs: string[]) => void;
}

const availablePairs: TradingPair[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: 51250, change24h: 2.5, volume: 28500000000, marketCap: 1005000000000 },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: 2850, change24h: 1.8, volume: 15200000000, marketCap: 342000000000 },
  { symbol: 'SOL/USDT', name: 'Solana', price: 102.50, change24h: 5.2, volume: 3800000000, marketCap: 44200000000 },
  { symbol: 'XRP/USDT', name: 'Ripple', price: 0.58, change24h: -0.7, volume: 1850000000, marketCap: 31200000000 },
  { symbol: 'ADA/USDT', name: 'Cardano', price: 0.55, change24h: 1.2, volume: 950000000, marketCap: 19500000000 },
];

export default function TradingPairSelector({ selectedPairs, onPairChange }: TradingPairSelectorProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Выбор торговых пар
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="pairs-select-label">Торговые пары</InputLabel>
        <Select
          labelId="pairs-select-label"
          id="pairs-select"
          multiple
          value={selectedPairs}
          onChange={(e) => onPairChange(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {availablePairs.map((pair) => (
            <MenuItem key={pair.symbol} value={pair.symbol}>
              {pair.symbol} - {pair.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mt: 2 }}
        onClick={() => console.log('Обновление графиков для пар:', selectedPairs)}
      >
        Обновить графики
      </Button>
    </Paper>
  );
}