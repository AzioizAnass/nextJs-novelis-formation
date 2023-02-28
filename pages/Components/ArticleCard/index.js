'use client'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";
import Button from "@mui/material";

export const ArticleCard = (card) => {
    return (
        <Grid item key={card} xs={12} sm={6} md={3}>
        <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardMedia
                component="img"
                sx={{
                    // 16:9
                    pt: '56.25%',
                }}
                image="https://scontent-lis1-1.xx.fbcdn.net/v/t39.30808-6/242474369_1107039696369295_4616048296092468392_n.png?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHvnNZ5qiz3MyGPWnyUaTfRs4LgaVDwwt6zguBpUPDC3hi61C_OETbk1JzEuLwit0TSLObgQj1LqKNcW49i30T_&_nc_ohc=n1SPJ-Gla7YAX-590HF&_nc_ht=scontent-lis1-1.xx&oh=00_AfBJ6A2xDAtQtyzfwxlow35EUqsyIwhu6FBrjxucprOk5Q&oe=63F356AF"
                alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                    articleTitle
                </Typography>
                <Typography>
                    articleContent
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More Details</Button>
            </CardActions>
        </Card></Grid>

    );
}