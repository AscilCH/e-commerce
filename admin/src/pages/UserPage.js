import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import {
  TextField,
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import EditUserForm from './EdiUserForm';
import NewUserForm from './NewUserForm';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'tel', label: 'Telephone', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: '' },
  { id: '', label: '', alignRight: false },
  
];

// ----------------------------------------------------------------------





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.nom && _user.nom.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage({loggedInUser }) {
  console.log('loggedInUser passed to UserPage:', loggedInUser);
  const [users, setUsers] = useState([]);
  const [USERLIST, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('nom');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [areItemsSelected, setAreItemsSelected] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:3002/api/users')
      .then(response => {
        setUserList(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
    setUsers(filteredUsers);
  }, [USERLIST, order, orderBy, filterName]);

  const handleFilterByName = (event) => {
    const inputValue = event.target.value;
    setPage(0);
    setFilterName(inputValue);
  };
  

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
    setAreItemsSelected(newSelected.length > 0); // Mettre à jour l'état en fonction de la sélection
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [editingUserId, setEditingUserId] = useState(null); 
  const handleEditUser = (userId) => {
    setOpen(true);
    setEditingUserId(userId); 
    handleCloseMenu(); 
  };
  const handleUpdateUser = (updatedUser) => {
    axios.put(`http://localhost:3002/api/users/${updatedUser._id}`, updatedUser)
      .then(response => {
        setUsers(prevUsers => prevUsers.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        console.log('User updated:', updatedUser._id);
        setIsEditing(false);
        setEditingUser(null);
        setEditingUserId(null); 
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  };
  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:3002/api/users/${userId}`)
      .then(response => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        console.log('User deleted:', userId);
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  return (
    <>
      <Helmet>
        <title> List User </title>
      </Helmet>

      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       
          <Typography variant="h4" gutterBottom>
          Liste User
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
          <SearchIcon fontSize="small" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name..."
            value={filterName}
            onChange={handleFilterByName}
            sx={{ marginLeft: -1, marginTop: 0 }} 
          /> 
        </Stack>
        </Stack>
        <Card >
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, nom, prenom, tel, role, email } = row;
                    const selectedUser = selected.indexOf(prenom) !== -1;

                    return (
                      

                      
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>

              
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, prenom)} />
                        </TableCell>
                        {editingUserId === _id?
                        null:

                        <>
                        <TableCell component="th" scope="row" padding="none">{nom}</TableCell>
                        <TableCell align="left">{prenom}</TableCell>
                        <TableCell align="left">{tel}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{}</TableCell>
                        </>}
                        <TableCell align="right">
                        {editingUserId === _id ? (
                            <EditUserForm
                            user={users.find(user => user._id === editingUserId)} // Get the user to edit using the ID
                            onUpdate={handleUpdateUser}
                            onCancel={() => setEditingUserId(null)} // Clear the editingUserId to close the form
                          />
                          ) : (
                            <>
                            <Button
                              onClick={() => handleEditUser(_id)}
                              size="small"
                              variant="text"
                              sx={{ color: 'text.secondary' }}
                              startIcon={<Iconify icon="eva:edit-2-fill" />}
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteUser(_id)}
                              size="small"
                              variant="text"
                              sx={{ color: 'error.main' }}
                              startIcon={<Iconify icon="eva:trash-2-fill" />}
                            >
                              Delete
                            </Button>
                          </>
                            )}
                        </TableCell>
                      </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                  {isNotFound && (
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        <Paper sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>
                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
