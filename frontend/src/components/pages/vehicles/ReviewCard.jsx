import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export function ReviewCard({ review }) {
    console.log(review)

    const averageRating = ((review.vehicle_rating + review.service_rating) / 2).toFixed(1)

    return (
        <Card
            sx={{
                margin: '20px',
                backgroundColor: '#252525',
                borderRadius: '5px',
                color: '#888',
                padding: '2em',
                marginBottom: '2em',
                '&:hover': { boxShadow: '0 0 10px #299bbe' }
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ marginBottom: '1em' }}
                >
                    Review by: {review.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ marginBottom: '1em' }}>
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{ fontSize: '1em', fontWeight: 'bold' }}
                            >
                                Vehicle Rating:
                            </Typography>
                            <Rating name="vehicle-rating" value={review.vehicle_rating} readOnly />
                        </Box>
                        <Box sx={{ marginBottom: '1em' }}>
                            <Typography
                                variant="body1"
                                component="p"
                                sx={{ fontSize: '1em', fontWeight: 'bold' }}
                            >
                                Service Rating:
                            </Typography>
                            <Rating name="service-rating" value={review.service_rating} readOnly />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="body2"
                            component="p"
                            sx={{ fontSize: '1.2em', marginBottom: '1em' }}
                        >
                            {review.comment}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography
                    variant="body1"
                    component="div"
                    sx={{ marginTop: '1em', fontWeight: 'bold' }}
                >
                    Average Rating: {averageRating} / 5
                </Typography>
            </CardContent>
        </Card>
    );
}
