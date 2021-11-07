import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import {BrowserRouter as Redirect, useHistory } from 'react-router-dom';
import { Grid,TextField,Button,FormGroup,FormControl, Card } from '@mui/material';
const regForPassword=RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);
const client=axios.create({
    baseURL:"http://localhost:3001/data"
})
export default function ChangePassword() {
    const [pass, setpass] = useState({Changepass:[]})
    const password = useRef('');
    const newpassword=useRef('');
    const confirmpassword=useRef('');
    const [Passwordcheck, setPasswordcheck] = useState('')
    const [Newpass, setNewpass] = useState('');
    const [confirmpass, setconfirmpass] = useState('')
    const history=useHistory()
    useEffect(() => {
        
    }, [])
    const handler=(event)=>{
        const name=event.target.name
        switch (name) {
            case 'password':
                const ep=regForPassword.test(password.current.value)?'':"Enter Valid password pattern"
                setPasswordcheck(ep)
                break;
            case 'NewPassword':
                const en=regForPassword.test(newpassword.current.value)?'':"Enter Valid password pattern"
                setNewpass(en)
                break;
            case 'ConfirmPassword':
                const ec=regForPassword.test(confirmpassword.current.value)?'':"Enter Valid password pattern"
                setconfirmpass(ec)
            default:
                break;
        }
    }
    const submit=(event)=>{
        event.preventDefault();
        const bcrypt=require('bcryptjs')
        const pass=bcrypt.hashSync(newpassword.current.value,bcrypt.genSaltSync())
        let arr=JSON.parse(localStorage.getItem('mydata'))
        const fromPassword=password.current.value
        const comparepass=bcrypt.compareSync(fromPassword,arr.password)
        console.log(comparepass);
        if(comparepass==true){
            if(newpassword.current.value===confirmpassword.current.value){
                let formData={...arr,password:pass}
                console.log(formData);
                client.put(`/${arr.id}`,formData)
                localStorage.clear()
                history.push('/')
            }
        }
        else{
            alert("Please enter correct current password")
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item lg={3}/>
                <Grid item lg={6}>
                    <Card className="top">
                    <form>
                        <FormGroup className="margin">
                            <FormControl>
                                <TextField id="outlined-Password" name="password" label="Password" type="text" onChange={handler} inputRef={password} />
                            </FormControl>
                        </FormGroup>
                        <FormGroup className="margin">
                                    <label className="red">{Passwordcheck}</label>
                                </FormGroup>
                        <FormGroup className="margin">
                            <FormControl>
                                <TextField id="outlined-NewPassword" name="NewPassword" label="NewPassword" type="text" onChange={handler} inputRef={newpassword} />
                            </FormControl>
                        </FormGroup>
                        <FormGroup className="margin">
                                    <label className="red">{Newpass}</label>
                                </FormGroup>
                        <FormGroup className="margin">
                            <FormControl>
                                <TextField id="outlined-ConfirmPassword" name="ConfirmPassword" label="ConfirmPassword" type="text" onChange={handler} inputRef={confirmpassword} />
                            </FormControl>
                        </FormGroup>
                        <FormGroup className="margin">
                                    <label className="red">{confirmpass}</label>
                                </FormGroup>
                        <FormGroup className="margin">
                            <FormControl>
                                <Button variant="contained" onClick={submit} >Change Password</Button>
                            </FormControl>
                        </FormGroup>
                    </form></Card>
                </Grid>
                <Grid item lg={3}/>
            </Grid>
        </div>
    )
}
