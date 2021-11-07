import { Button, FormControl, FormGroup, Grid, TextField } from '@mui/material'
import React,{useState} from 'react'

export default function Captcha() {
    const [user, setUser] = useState({username:''})
     const handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        user[name] = value;
        setUser(user);
        console.log(user);
     }
     
     const characters ='abc123';
     const generateString=(length)=>{
      let result = '';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
     return result;
   }
     const captcha=generateString(6)
     const Check=(e)=>{
        var element =  document.getElementById("succesBTN");
        var inputData = document.getElementById("inputType");
         element.style.cursor = "wait";
         element.innerHTML  = "Checking...";
         inputData.disabled = true;
         element.disabled = true;
         var myFunctions = function(){
            if(captcha == user.username)
            {
              element.innerHTML  = "Captcha Verified";
              element.disabled = true;
              element.style.cursor = "not-allowed";
              inputData.style.display = "none";
              
            }
            else
            {
              element.style.backgroundColor   = "red";
              element.style.cursor = "not-allowed";
              element.innerHTML  = "Not Matched";
              element.disabled = true;
              //  element.disabled = true;
              var myFunction = function(){
                element.style.backgroundColor   = "#007bff";
                element.style.cursor = "pointer";
                element.innerHTML  = "Verify Captcha";
                element.disabled = false;
                inputData.disabled = false;
                inputData.value ='sssss';
              };
              setTimeout(myFunction,5000);
            }
          }   
          setTimeout(myFunctions,5000); 
    }
    return (
        <div>
         <Grid container>
             <Grid item lg>
                {captcha}
              </Grid>
              <Grid item lg>
                  <FormGroup>
                  <FormControl>
                    <TextField type='text' id="inputType" name="username" onChange={handleChange} autoComplete="off"/>
                    </FormControl>
                  </FormGroup>
                  <FormGroup>
                      <FormControl>
                          <Button variant="outlined" id="succesBTN" onClick={Check}>Verify</Button>
                      </FormControl>
                  </FormGroup>
                </Grid>   
        </Grid>   
        
        </div>
    )
}
