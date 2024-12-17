/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {
  return (
    <Card>
      <CardMedia>
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 100, height: 100, mx: 'auto', mt: 2 }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
          {user.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {user.description}
        </Typography>
        <Box
          sx={{
            display: 'inline-block',
            padding: '5px 10px',
            borderRadius: '20px',
            backgroundColor: user.status === 'Current' ? 'green' : 'gray',
            color: 'white',
          }}
        >
          {user.status}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <IconButton color="primary" component={Link} to={`/Action/edit/${user.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(user.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
