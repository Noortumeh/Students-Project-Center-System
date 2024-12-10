import PropTypes from 'prop-types'; 
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import LoadingChart from '../generalcomponent/LoadingChart ';
function ProjectStatusChart({ data, loading }) {
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
          <LoadingChart />
        ) : (
          <Doughnut ref={chartRef} data={data} />
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
