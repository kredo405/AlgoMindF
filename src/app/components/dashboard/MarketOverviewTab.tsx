import { useState } from 'react';
import { Grid } from '@mui/material';
import TradingPairSelector from './TradingPairSelector';
import TradingPairsList from './TradingPairsList';
import PriceChart from './PriceChart';

export default function MarketOverviewTab() {
  const [selectedPairs, setSelectedPairs] = useState<string[]>(['BTC/USDT']);

  const handlePairChange = (pairs: string[]) => {
    setSelectedPairs(pairs);
  };

  return (
    <Grid container spacing={3}>
      {/* Выбор пар и список */}
      <Grid item xs={12} md={4}>
        <TradingPairSelector 
          selectedPairs={selectedPairs} 
          onPairChange={handlePairChange} 
        />
        <TradingPairsList />
      </Grid>

      {/* График */}
      <Grid item xs={12} md={8}>
        <PriceChart selectedPairs={selectedPairs} />
      </Grid>
    </Grid>
  );
}