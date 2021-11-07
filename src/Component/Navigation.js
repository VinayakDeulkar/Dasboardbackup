import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,Switch,Route,useHistory } from 'react-router-dom'
import DashBoard from './DashBoard';
import Login from './Login'
import Signup from './Signup';

export default function Navigation() {
    const history=useHistory();
    // const [IsLogin, setIsLogin] = useState(true)
    useEffect(() => {
        const arr=JSON.parse(localStorage.getItem('mydata'))
        if(arr==undefined){
            history.push("/")
            // setIsLogin(false)
        }
        else{
            history.push("/DashBorad")
            // setIsLogin(true)
        }
    }, [])
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/DashBorad" exact component={DashBoard}/>
                    <Route path="/Register" exact component={Signup}/>
                </Switch>
                {/* {IsLogin==true?history.push("/"):history.push("/DashBorad")} */}
            </Router>
        </div>
    )
}
