import React,{useState,useRef} from 'react'
import { Button, Card,  CardContent,  FormControl, FormGroup, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import {BrowserRouter as Router,useHistory } from 'react-router-dom'
import Captcha from './Captcha'
const client=axios.create({
    baseURL:"http://localhost:3001/data"
})
export default function Signup() {
    const [Error, setError] = useState({erruser:'',errpass:'',errname:'',errcpass:'',errcity:''}) 
    const UserId = useRef('');
    const Password=useRef('');
    const userName = useRef('')
    const Cpassword = useRef('');
    const City = useRef('')
    const history=useHistory();
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/[A-Za-z0-9 $ @ % &]{8}/);
    const regForName=RegExp(/[A-Za-z ]+/)
    
    const Login=()=>{
        history.push("/")
    }
    
    const handler=(event)=>{
        const name=event.target.name;
        switch (name) {
            case 'username':
                const eu=regForEmail.test(UserId.current.value)?'':"Enter valid email pattern"
                setError({
                    erruser:eu
                })
                break;
            case 'Name':
                const en=regForName.test(userName.current.value)?'':"Enter valid name pattern"
                setError({
                    errname:en
                })
                break;
            case 'city':
                    const ec=regForName.test(City.current.value)?'':"Enter valid City pattern"
                    setError({
                        errcity:ec
                    })
                    break;
            case 'password':
                const ep=regForPassword.test(Password.current.value)?'':"Enter Valid password pattern"
                
                setError({
                    errpass:ep
                })
                break;
            case 'confirmpassword':
                const ecp=Password.current.value==Cpassword.current.value?'':'Password must be same';
                setError({
                    errcpass:ecp
                })
                break;
            default:
                break;
        }
    }
    const Submit=async()=>{
        const bcrypt=require('bcryptjs')
        const pass=bcrypt.hashSync(Password.current.value,bcrypt.genSaltSync())
        console.log(pass);
        if(UserId.current.value!=undefined && Password.current.value!=undefined && City.current.value!=undefined && userName.current.value!=undefined ){
            let formData={id:Math.random(),email:UserId.current.value,name:userName.current.value,password:pass,city:City.current.value}
            console.log(formData);
            client.post('/',formData)
            history.push("/")
        }
    }
    return (
        <div className="topSignup">
            <Router>
            <Grid container>
                <Grid item lg={4}  md={4}/>
                <Grid item  lg={4} xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4">Sign Up</Typography>
                            <form >
                                
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-UserName" name="username" onChange={handler} label="UserName/Email" type="text"  inputRef={UserId} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.erruser}</label>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-Name" name="Name" label="Name" onChange={handler} type="text"  inputRef={userName} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.errname}</label>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-City" name="city" label="city" onChange={handler} type="text"  inputRef={City} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.errcity}</label>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-Password" name="password" label="Password" onChange={handler} type="password"  inputRef={Password} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.errpass}</label>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <FormControl>
                                        <TextField id="outlined-ConfirmPassword" name="confirmpassword" onChange={handler} label="Confirm Password" type="password"  inputRef={Cpassword} />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup className="margin">
                                    <label className="red">{Error.errcpass}</label>
                                </FormGroup>
                                <FormGroup>
                                    <Captcha/>
                                </FormGroup>
                               <FormGroup className="margin">
                                   <FormControl>
                                       <Button variant="contained" onClick={Submit} >Register</Button>
                                   </FormControl>
                               </FormGroup>
                            </form>
                            <Typography variant="caption">Already have account?</Typography>
                            <Typography variant="button" onClick={Login}>Login!</Typography>
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item lg={4}  md={4}/>
            </Grid>
            </Router>
        </div>
    )
}
