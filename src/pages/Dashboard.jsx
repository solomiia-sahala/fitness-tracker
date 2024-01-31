import {
  Box, Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  Paper,
  Toolbar,
  Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Copyright from '../components/Copyright';
import { useState } from 'react';
import { AppBar } from '../components/AppBar';
import { Drawer } from '../components/Drawer';
import { NavigationList } from '../constants/navigation-list.const';
import ListItem from '../components/ListItem';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { withAuthentication } from '../components/hocComponents/withAuthentication';
import AuthenticationContext from '../contexts/authContext';
import NotAuthorized from '../components/NotAuthorized';

function Dashboard(props) {
  const [open, setOpen] = useState(true);
  const url = useResolvedPath("").pathname;
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const signOut = () => {
    props.firebase.signOut()
      .then(() => navigate("/"))
      .catch(error => {
        console.error(error.message)
      });
  }

  return (
    <AuthenticationContext.Consumer>
      { user => user ? (<Box sx={ { display: 'flex' } }>
          <CssBaseline/>
          <AppBar position="absolute" open={ open }>
            <Toolbar
              sx={ {
                pr: '24px', // keep right padding when drawer closed
              } }
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={ toggleDrawer }
                sx={ {
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                } }
              >
                <MenuIcon/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={ { flexGrow: 1 } }
              >
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={ open }>
            <Toolbar
              sx={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              } }
            >
              <IconButton onClick={ toggleDrawer }>
                <ChevronLeftIcon/>
              </IconButton>
            </Toolbar>
            <Divider/>
            <List component="nav">
              { NavigationList.map((item, i) => {
                if (item.text === 'Logout') {
                  return <ListItem key={ i } { ...item } callback={ signOut }/>
                }
                return (
                  <Link to={ `${ url }${ item.path }` } key={ i }
                        style={ { textDecoration: 'none', color: 'inherit' } }>
                    <ListItem { ...item }/>
                  </Link>
                )
              }) }
            </List>
          </Drawer>
          <Box
            component="main"
            sx={ {
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            } }
          >
            <Toolbar/>
            <Container maxWidth="lg" sx={ { mt: 4, mb: 4 } }>
              <Grid container spacing={ 3 }>
                {/* Chart */ }
                <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
                  <Paper
                    sx={ {
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    } }
                  >
                    {/*<Chart />*/ }
                  </Paper>
                </Grid>
                {/* Recent Deposits */ }
                <Grid item xs={ 12 } md={ 4 } lg={ 3 }>
                  <Paper
                    sx={ {
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    } }
                  >
                    {/*<Deposits />*/ }
                  </Paper>
                </Grid>
                {/* Recent Orders */ }
                <Grid item xs={ 12 }>
                  <Paper sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
                    {/*<Orders />*/ }
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={ { pt: 4 } }/>
            </Container>
          </Box>
        </Box>) : <NotAuthorized/>
      }
    </AuthenticationContext.Consumer>
  );
}

export default withAuthentication(Dashboard);