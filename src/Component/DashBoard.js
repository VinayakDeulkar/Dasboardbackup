import { AppBar, Button, Grid,Toolbar, Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router, NavLink,useRouteMatch,Route,Switch,useHistory } from 'react-router-dom'
import AddCategory from './AddCategory'
import Category from './Category'
import ChangePassword from './ChangePassword'
export default function DashBoard() {
    const [UserLog, setUserLog] = useState('')
    const history=useHistory()
    useEffect(() => {
        const arr=JSON.parse(localStorage.getItem('mydata'))
        setUserLog(arr)
        
    }, [])
    let match=useRouteMatch()
    const Logout=()=>{
        localStorage.clear();
        history.push('/');
    }
    return (
        <div>
            <Router>
                <Grid>
                    <Grid item lg={12}>
                        <AppBar position="static">
                            <Toolbar variant="dense" >
                                <NavLink to={`${match.url}`} className="text"> <Typography variant="h6" >Home</Typography></NavLink>
                                <NavLink to={`${match.url}/ChangePassword`} className="text" > <Typography variant="h6">Change Password</Typography> </NavLink>
                                <label className="text"><Typography variant="h6" >User:{UserLog.email}</Typography></label>
                                <Button variant='contained'onClick={Logout} >LogOut</Button>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid container>
                        <Grid item lg={2}  >
                            <NavLink to={`${match.url}`} className="textCate"><Typography variant="body1" >Category</Typography></NavLink>
                            <NavLink to={`${match.url}/AddCategory`} className="textCate"><Typography variant="body1" >Add Category</Typography></NavLink>
                        </Grid> 
                        <Grid item lg={10} >
                            <Switch>
                                <Route path={`${match.url}`} exact component={Category}/>
                                <Route path={`${match.url}/AddCategory`} exact component={AddCategory}/>
                                <Route path={`${match.url}/ChangePassword`} exact component={ChangePassword}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </Router>
        </div>
    )
}
