import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { AccountBalance, Notifications, TrendingUp } from '@mui/icons-material';

interface Stats {
  connectedExchanges: number;
  todaySignals: number;
  portfolioValue: number;
}

interface StatsCardsProps {
  stats: Stats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: 'success.dark', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalance sx={{ mr: 1 }} />
              <Typography variant="h6">Подключенные биржи</Typography>
            </Box>
            <Typography variant="h4">{stats.connectedExchanges}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Notifications sx={{ mr: 1 }} />
              <Typography variant="h6">Сигналов за сегодня</Typography>
            </Box>
            <Typography variant="h4">{stats.todaySignals}</Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ bgcolor: 'info.dark', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h6">Стоимость портфеля</Typography>
            </Box>
            <Typography variant="h4">${stats.portfolioValue.toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}