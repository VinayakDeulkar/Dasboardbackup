import React,{useEffect,useState} from 'react'
import { Table,TableRow,TableCell,Typography,Button,TableBody,TableHead } from '@mui/material'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/product"
})
export default function Category() {
    const [ProductData, setProductData] = useState({Data:[]})
    useEffect(() => {
        client.get()
        .then(res=>{
            console.log(res.data);
            setProductData({...ProductData,Data:res.data})
        })
        console.log(ProductData.Data);
    }, [])
    const DeleteData=(key)=>{
        console.log(key);
        client.delete(`${key}`)
        .then(res=>{
            client.get()
            .then(res=>{
                console.log(res.data);
                setProductData({...ProductData,Data:res.data})
            })
        })
    }
    
    return (
        <div>
            <Typography variant="h4">Category</Typography>
             <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> <Typography varient="caption">Product Name</Typography></TableCell>
                                <TableCell> <Typography varient="caption">Product Price</Typography></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ProductData.Data.map((ele)=>
                                <TableRow key={ele.id}>
                                    <TableCell><Typography varient="caption">{ele.pname}</Typography></TableCell>
                                    <TableCell><Typography varient="caption">{ele.price}</Typography></TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={()=>DeleteData(ele.id)} color="error">Delete</Button>
                                       
                                    </TableCell>
                                </TableRow>    
                                )
                            }
                        </TableBody>
                    </Table>
        </div>
    )
}
