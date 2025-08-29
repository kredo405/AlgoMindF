'use client';

import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  Alert
} from '@mui/material';
import { ContentCopy, CheckCircle, Refresh } from '@mui/icons-material';

interface BybitData {
  symbol: string;
  timeframe: string;
  price: string;
  fundingRate: string;
  openInterest: string;
  volume24h: string;
  liquidationData: string;
  orderBookDepth: string;
  technicalIndicators: string;
  marketSentiment: string;
}

export default function BybitDataPrompt() {
  const [bybitData, setBybitData] = useState<BybitData>({
    symbol: 'BTCUSDT',
    timeframe: '15',
    price: '',
    fundingRate: '',
    openInterest: '',
    volume24h: '',
    liquidationData: '',
    orderBookDepth: '',
    technicalIndicators: '',
    marketSentiment: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  // Заглушка для получения данных из Bybit API
  const fetchBybitData = async () => {
    // В реальном приложении здесь будет запрос к вашему бэкенду,
    // который получает данные из Bybit API
    try {
      // Имитация получения данных
      const mockData = {
        price: '$42,150.75',
        fundingRate: '0.01%',
        openInterest: '$15.4B',
        volume24h: '$28.5B',
        liquidationData: '$45.2M longs, $32.1M shorts в последние 24 часа',
        orderBookDepth: 'Сильные лимитные ордера на покупку на уровне $41,800',
        technicalIndicators: 'RSI: 62, MACD: bullish, Bollinger Bands: верхняя полоса',
        marketSentiment: 'Преобладает бычье настроение'
      };

      setBybitData(prev => ({
        ...prev,
        ...mockData
      }));
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchBybitData();

    if (autoRefresh) {
      const interval = setInterval(fetchBybitData, 30000); // Обновление каждые 30 секунд
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const generatePrompt = () => {
    const prompt = `
Проанализируй следующие данные с Bybit для пары ${bybitData.symbol} на таймфрейме ${bybitData.timeframe} минут:

ТЕКУЩИЕ ДАННЫЕ:
- Текущая цена: ${bybitData.price}
- Funding Rate: ${bybitData.fundingRate}
- Open Interest: ${bybitData.openInterest}
- Объем за 24 часа: ${bybitData.volume24h}
- Данные по ликвидациям: ${bybitData.liquidationData}

АНАЛИЗ РЫНКА:
- Глубина стакана: ${bybitData.orderBookDepth}
- Технические индикаторы: ${bybitData.technicalIndicators}
- Рыночное настроение: ${bybitData.marketSentiment}

ПРОСЬБА К АНАЛИЗУ:
Проанализируй эти данные и предоставь:
1. Общую оценку текущей ситуации на рынке
2. Ключевые уровни поддержки и сопротивления
3. Потенциальные точки входа и выхода
4. Оценку рисков и рекомендации по управлению капиталом
5. Прогноз на ближайшие 24-48 часов

Учти волатильность рынка и возможное влияние внешних факторов.
    `.trim();

    setGeneratedPrompt(prompt);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка при копировании текста: ', err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Генератор промтов с данными Bybit
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Этот компонент автоматически собирает данные с Bybit API для формирования детального промта для ИИ-анализа.
      </Alert>

      <Grid container spacing={3}>
        {/* Настройки */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Торговая пара</InputLabel>
            <Select
              value={bybitData.symbol}
              label="Торговая пара"
              onChange={(e) => setBybitData({...bybitData, symbol: e.target.value})}
            >
              <MenuItem value="BTCUSDT">BTC/USDT</MenuItem>
              <MenuItem value="ETHUSDT">ETH/USDT</MenuItem>
              <MenuItem value="SOLUSDT">SOL/USDT</MenuItem>
              <MenuItem value="XRPUSDT">XRP/USDT</MenuItem>
              <MenuItem value="ADAUSDT">ADA/USDT</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Таймфрейм (минуты)</InputLabel>
            <Select
              value={bybitData.timeframe}
              label="Таймфрейм (минуты)"
              onChange={(e) => setBybitData({...bybitData, timeframe: e.target.value})}
            >
              <MenuItem value="1">1 минута</MenuItem>
              <MenuItem value="5">5 минут</MenuItem>
              <MenuItem value="15">15 минут</MenuItem>
              <MenuItem value="30">30 минут</MenuItem>
              <MenuItem value="60">1 час</MenuItem>
              <MenuItem value="240">4 часа</MenuItem>
              <MenuItem value="D">1 день</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
            }
            label="Автообновление данных"
          />

          <Button
            variant="outlined"
            fullWidth
            onClick={fetchBybitData}
            startIcon={<Refresh />}
            sx={{ mt: 2 }}
          >
            Обновить данные
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={generatePrompt}
            sx={{ mt: 2 }}
          >
            Сгенерировать промт
          </Button>
        </Grid>

        {/* Данные */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle2" gutterBottom>
            Данные с Bybit API:
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Текущая цена"
                value={bybitData.price}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Funding Rate"
                value={bybitData.fundingRate}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Open Interest"
                value={bybitData.openInterest}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Объем 24h"
                value={bybitData.volume24h}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Данные по ликвидациям"
                value={bybitData.liquidationData}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Глубина стакана"
                value={bybitData.orderBookDepth}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Технические индикаторы"
                value={bybitData.technicalIndicators}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Рыночное настроение"
                value={bybitData.marketSentiment}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Сгенерированный промт */}
      {generatedPrompt && (
  <Box sx={{ mt: 3 }}>
    <Divider sx={{ mb: 2 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="subtitle2">
        Сгенерированный промт для ИИ:
      </Typography>
      <IconButton onClick={copyToClipboard} size="small">
        {copied ? <CheckCircle color="success" /> : <ContentCopy />}
      </IconButton>
    </Box>
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        bgcolor: 'grey.900', // Более темный фон
        maxHeight: 300,
        overflow: 'auto',
        borderColor: 'grey.700', // Более заметная граница
      }}
    >
      <Typography 
        variant="body2" 
        whiteSpace="pre-wrap"
        sx={{ 
          color: 'grey.100', // Светлый текст для контраста
          fontFamily: 'monospace', // Моноширинный шрифт для лучшей читаемости
          fontSize: '0.875rem',
          lineHeight: 1.5,
        }}
      >
        {generatedPrompt}
      </Typography>
    </Paper>
  </Box>
)}

      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          📊 Какие данные включаются в анализ:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Funding Rate</strong> - стоимость удержания позиции
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Open Interest</strong> - общий объем открытых позиций
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Объем торгов</strong> - активность на рынке
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Данные по ликвидациям</strong> - уровни, где могут быть массовые ликвидации
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • <strong>Глубина стакана</strong> - распределение ордеров на покупку и продажу
        </Typography>
        <Typography variant="body2">
          • <strong>Технические индикаторы</strong> - RSI, MACD, Moving Averages и др.
        </Typography>
      </Box>
    </Paper>
  );
}