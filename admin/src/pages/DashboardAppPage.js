import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,} from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Dashboard E-commerce</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Welcome, Admin
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Latest News"
              list={[
                {
                  id: faker.datatype.uuid(),
                  title: 'New Product Release',
                  description: 'Introducing our latest smartphone model with advanced features.',
                  image: `/assets/images/news/news1.jpg`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Summer Sale',
                  description: 'Enjoy massive discounts on selected items during our summer sale.',
                  image: `/assets/images/news/news2.jpg`,
                  postedAt: faker.date.recent(),
                },
                {
                  id: faker.datatype.uuid(),
                  title: 'Customer Reviews',
                  description: 'Read what our customers are saying about their shopping experience.',
                  image: `/assets/images/news/news3.jpg`,
                  postedAt: faker.date.recent(),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'New Order Placed',
                  'Payment Received',
                  'Order Shipped',
                  'Order Delivered',
                  'Product Return',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
