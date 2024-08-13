import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import DemandePage from './pages/DemandePage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryPage from './pages/CategoryPage'
import CommandPage from './pages/CommandPage'
import FacturePage from'./pages/FacturePage'
import Profile  from'./pages/profile'
// ----------------------------------------------------------------------

export default function Router({ loggedInUser }) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage/> },
        { path: 'demande', element: <DemandePage/> },
        { path: 'categorie', element: <CategoryPage /> },
        { path: 'commande', element: <CommandPage /> },
        { path: 'facture', element: <FacturePage /> },
        { path: 'profile', element:<Profile loggedInUser={loggedInUser}/>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage/>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
