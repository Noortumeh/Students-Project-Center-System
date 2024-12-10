import { Box, Chip, Typography } from '@mui/material';

export default function SelectItem ( selectedItems, onRemove, itemType ) {
  return (
    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {selectedItems.length > 0 ? (
        selectedItems.map((item, index) => (
          <Chip
            key={index}
            label={item}
            color="primary"
            onDelete={() => onRemove(item)}
            sx={{ fontSize: '1rem', padding: '5px 10px' }}
          />
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No {itemType} selected yet.
        </Typography>
      )}
    </Box>
  );
};
