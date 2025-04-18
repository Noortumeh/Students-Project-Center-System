import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import image from "../../assets/images/SignBg.jpg";

export default function DescriptionCard({ title, description, action, link}) {
    return (
        <Card sx={{  
            width: 350,  // يضمن أن البطاقة لا تصبح كبيرة جدًا
            minHeight: 350, // ارتفاع ثابت للبطاقة
            display: 'flex',
            flexDirection: 'column',justifyContent: 'space-between',m: 2,
            bgcolor: '#2F3349' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    sx={{
                        objectFit: 'cover'
                    }}
                />
                <CardContent sx={{ color: 'white' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff9' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button href= {link} style={{ backgroundColor: '#7367F0' }} variant="contained">
                    {action}
                </Button>
            </CardActions>
        </Card>
    );
}