import React,{useRef,useEffect,useState} from 'react'
import { Box,Typography,FormGroup,FormLabel,FormControl,TextField,Button, Grid, Card } from '@mui/material'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/product"
})
export default function AddCategory() {
    const [ProductData, setProductData] = useState({Data:[]})
    const Pname = useRef(null)
    const Price = useRef(null)
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setProductData({...ProductData,Data:res.data})
        })
        console.log(ProductData.Data);
    }, [])
    const AddData=(event)=>{
        event.preventDefault();
        console.log(Price.current.value);
        console.log(Pname.current.value);
        
        if(Pname.current.value!=undefined && Price.current.value!=undefined){
                let formData={id:Math.random(),pname:Pname.current.value,price:Price.current.value}
                client.post("/",formData)
                .then(res=>{
                    client.get()
                        .then(res=>{
                            console.log(res.data);
                            setProductData({...ProductData,Data:res.data})
                            Pname.current.value=''
                            Price.current.value=''
                        })
                })
            
        }
    }
    return (
        <div>
            <Grid container>
                <Grid item lg={3}/>
                <Grid item lg={6}>
                    <Card className="top">
                        <Box>
                        <Typography variant="h5">
                            Add Product
                        </Typography>
                        <form onSubmit={AddData}>
                            <FormGroup className="margin">
                                <FormControl type="text" fullWidth lg={{ m: 1 }}>
                                    <TextField id="outlined-Name" name="Pname" label="Product Name" type="text"  inputRef={Pname} />
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="margin">
                                <FormControl fullWidth lg={{ m: 1 }}>
                                <TextField id="outlined-Price" name="Price" label="Price" type="text" inputRef={Price} />
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="margin">
                            <Button variant="contained" type="submit" color="success">Add</Button>
                            </FormGroup>
                            
                            
                        </form>
                    </Box></Card>
                    <Grid item lg={3}/>
                    </Grid>
                </Grid>
        </div>
    )
}
