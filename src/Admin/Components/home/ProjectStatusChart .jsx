import PropTypes from 'prop-types'; 
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';  
import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; 
import LoadingChart from '../generalcomponent/LoadingChart ';

function ProjectStatusChart({ data, loading }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof Chart.register === 'function') {
      Chart.register(ArcElement, Tooltip, Legend);
    }

    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    if (chartRef.current && data) {
      chartRef.current.chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true },
            legend: { position: 'top' },
          },
        }}); 
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    };
  }, [data, loading]);  

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Projects Status</Typography>
        {loading ? (
          <LoadingChart />
        ) : (
          <canvas ref={chartRef} />  
        )}
      </CardContent>
    </Card>
  );
}

ProjectStatusChart.propTypes = {
  data: PropTypes.object.isRequired, 
  loading: PropTypes.bool.isRequired, 
};

export default ProjectStatusChart;
