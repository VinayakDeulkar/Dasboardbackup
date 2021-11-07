import { Button, Card,  CardContent,  FormControl, FormGroup, Grid, TextField, Typography } from '@mui/material'
import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import {BrowserRouter as Router,NavLink,useHistory } from 'react-router-dom'
const client=axios.create({
    baseURL:"http://localhost:3001/data"
})
export default function Login() {
    const [UserData, setUserData] = useState({Userdata:[]})
    const [Error, setError] = useState({erruser:'',errpass:''})
    const UserId = useRef('');
    const Password=useRef('');
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/[A-Za-z0-9 $ @ % &]{8}/);
    const history=useHistory();
    useEffect(async() => {
        try{
            const res=await client.get();
            console.log(res.data);
            setUserData({Userdata:res.data})
            
        }
        catch(err){
            console.log(err);
        }
        
    }, [])

    const handler=(event)=>{
        const name=event.target.name;
        console.log(name);
        switch (name) {
            case 'username':
                const eu=regForEmail.test(UserId.current.value)?'':"Enter valid email pattern"
                setError({
                    erruser:eu
                })
                break;
            case 'password':
                const ep=regForPassword.test(Password.current.value)?'':"Enter Valid password pattern"
                setError({
                    errpass:ep
                })
                break;
            default:
                break;
        }
    }
    const LoginData=()=>{
        const bcrypt=require('bcryptjs')
        const pass=bcrypt.hashSync(Password.current.value,bcrypt.genSaltSync())
        console.log(pass);
        const fromPassword=Password.current.value
        UserData.Userdata.forEach(element=>{
            const comparepass=bcrypt.compareSync(fromPassword,element.password)
            console.log(comparepass);
            console.log(element.password);
            if(element.email===UserId.current.value&& comparepass==true){
                
                let userlog={id:element.id,email:element.email,password:element.password,name:element.name,city:element.city}
                localStorage.setItem('mydata',JSON.stringify(userlog))
                history.push("/DashBorad")
            }
            
        }
        )
    }
    const Register=()=>{
        history.push("/Register")
    }
    return (
        <div className="top">
            <Router>
            <Grid container>
                <Grid item lg={4}  md={4}/>
                <Grid item  lg={4} xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">Login</Typography>
                            <form >
                                
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-UserName" name="username" label="UserName" type="text" onChange={handler} inputRef={UserId} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.erruser}</label>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-Password" name="password" label="Password" type="password" onChange={handler} inputRef={Password} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.errpass}</label>
                                </FormGroup>
                               <FormGroup className="margin">
                                   <FormControl>
                                       <Button variant="contained" onClick={LoginData} >Sign In</Button>
                                   </FormControl>
                               </FormGroup>
                            </form>
                            <Typography variant="caption">Don't have account?</Typography>
                            <Typography variant="button" onClick={Register}><NavLink to="/Register"> Register Now!</NavLink> </Typography>
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item lg={4}  md={4}/>
            </Grid>
            </Router>
        </div>
    )
}
