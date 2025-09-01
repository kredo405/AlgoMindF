'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { ShowChart, CandlestickChart, AutoAwesome, DataArray } from '@mui/icons-material';
import BybitDataPrompt from './BybitDataPrompt';

import StatsCards from './StatsCards';
import MarketOverviewTab from './MarketOverviewTab';
import StrategySignalsTab from './StrategySignalsTab';

// Компонент табов
function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Dashboard() {
  const [stats] = useState({
    connectedExchanges: 1,
    todaySignals: 12,
    portfolioValue: 15432.50,
  });
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Заглушка для имитации загрузки данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        AlgoMind
      </Typography>

      <StatsCards stats={stats} />

      {/* Вкладки */}
      <Paper sx={{ width: '100%', mb: 2, display: "flex", justifyContent: "center", mx: "0 auto", overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            maxWidth: '100%',
            '& .MuiTab-root': {
              minWidth: 'auto',
              px: 4,
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
            }
          }}
        >
          <Tab icon={<ShowChart />} label="Рынок" />
          <Tab icon={<CandlestickChart />} label="Стратегии" />
          <Tab icon={<AutoAwesome />} label="Промты" />
          <Tab icon={<DataArray />} label="Bybit" />
        </Tabs>
      </Paper>

      {/* Контент вкладок */}
      <TabPanel value={tabValue} index={0}>
        <MarketOverviewTab />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <StrategySignalsTab />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <BybitDataPrompt />
      </TabPanel>
    </Box>
  );
}