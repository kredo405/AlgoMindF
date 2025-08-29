import { Paper, Typography, Box } from '@mui/material';

interface StrategySignal {
  pair: string;
  strategy: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number;
  timestamp: Date;
  price: number;
}

const strategySignals: StrategySignal[] = [
  { pair: 'BTC/USDT', strategy: 'RSI Дивергенция', signal: 'BUY', confidence: 0.85, timestamp: new Date(), price: 51250 },
  { pair: 'ETH/USDT', strategy: 'Пересечение скользящих средних', signal: 'BUY', confidence: 0.72, timestamp: new Date(), price: 2850 },
  { pair: 'SOL/USDT', strategy: 'Полосы Боллинджера', signal: 'SELL', confidence: 0.63, timestamp: new Date(), price: 102.50 },
  { pair: 'XRP/USDT', strategy: 'MACD', signal: 'NEUTRAL', confidence: 0.45, timestamp: new Date(), price: 0.58 },
];

export default function StrategySignalsTab() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Активные сигналы стратегий
      </Typography>
      
      {strategySignals.map((signal, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            mb: 1,
            borderRadius: 1,
            backgroundColor: 
              signal.signal === 'BUY' ? 'success.dark' : 
              signal.signal === 'SELL' ? 'error.dark' : 
              'grey.800'
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {signal.pair}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {signal.strategy}
            </Typography>
            <Typography variant="caption" display="block">
              {signal.timestamp.toLocaleTimeString()}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body1" fontWeight="bold">
              {signal.signal === 'BUY' ? 'ПОКУПКА' : signal.signal === 'SELL' ? 'ПРОДАЖА' : 'НЕЙТРАЛЬНО'}
            </Typography>
            <Typography variant="body2">
              Уверенность: {(signal.confidence * 100).toFixed(0)}%
            </Typography>
            <Typography variant="body2">
              Цена: ${signal.price}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}