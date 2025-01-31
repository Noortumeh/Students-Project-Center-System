/* eslint-disable react/prop-types */
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

function LoadingChart({ data, loading }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [data]);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Projects Status</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Doughnut ref={chartRef} data={data} options={{ plugins: { tooltip: { enabled: true } } }} />
        )}
      </CardContent>
    </Card>
  );
}

export default LoadingChart;
