// component
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import TaskIcon from '@mui/icons-material/Task';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorIcon from '@mui/icons-material/Error';

// ----------------------------------------------------------------------

const getMuiIcon = (name) => {
  switch (name) {
    case 'dashboard':
      return <DashboardIcon />;
    case 'user':
      return <PersonIcon />;
    case 'product':
      return <ShoppingCartIcon />;
    case 'blog':
      return <ChatIcon />;
    case 'categorie':
      return <CategoryIcon />;
    case 'demande':
      return <TaskIcon />;
    case 'commande':
      return <CategoryOutlinedIcon />;
    case 'facture':
      return <AssignmentIcon />;
    case 'profile':
      return <LockIcon />;
    case 'login':
      return <LockOutlinedIcon />;
    case 'Not found':
      return <ErrorIcon />;
    default:
      return null;
  }
};

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getMuiIcon('dashboard'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getMuiIcon('user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getMuiIcon('product'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getMuiIcon('blog'),
  },
  {
    title: 'demande',
    path: '/dashboard/demande',
    icon: getMuiIcon('demande'),
  },
  {
    title: 'categorie',
    path: '/dashboard/categorie',
    icon: getMuiIcon('categorie'),
  },
  {
    title: 'commande',
    path: '/dashboard/commande',
    icon: getMuiIcon('commande'),
  },
  {
    title: 'facture',
    path: '/dashboard/facture',
    icon: getMuiIcon('facture'),
  },
  {
    title: 'profile',
    path: '/dashboard/profile',
    icon: getMuiIcon('profile'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getMuiIcon('login'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getMuiIcon('Not found'),
  },
];

export default navConfig;
