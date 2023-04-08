import {useState } from "react";
import { Box, FormControl, Stack, TextField, Button ,Grid ,Card, CardContent } from "@mui/material";
import { PageHeader } from "../components/index";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import transactionApi from "../api/transactionApi";
const Add = () => {
  const navigate = useNavigate()
  const [onSubmit, setOnSubmit] = useState(false)
  const [type, setType] = useState('')
  const [typeError, setTypeError] = useState(false)
  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [dateError, setDateError] = useState(false)
  
  const createTransaction = async() =>{
    console.log('CreateTransaction')
    if(onSubmit) return
    const error= [!type,!category,!amount,!date]
    setTypeError(!type)
    setCategoryError(!category)
    setAmountError(!amount)
    setDateError(!date)
    if(!error.every(e=> !e)) return
    setOnSubmit(true)

    const body = {
      type:type,
      category:category,
      amount:amount,
      date:date
    }

    try {
      const res= await transactionApi.create(body)
      console.log(res)
      setOnSubmit(false)
    } catch (error) {
      setOnSubmit(false)
      alert(error)
      console.log(error)
    }


  }
  return (
    <Box fullWidth>
        <PageHeader title="Create Transaction" rightContent={
        <Stack direction='row' spacing={2}>
          <Button variant="text" onClick={() => navigate('/transactionlist')}>
            Cancel
          </Button>
          <LoadingButton variant="contained" onClick={createTransaction} loading={onSubmit}>
            Create
          </LoadingButton>
        </Stack>}/>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card elevation={0}>
                  <CardContent>
                    <FormControl fullWidth margin="normal">
                        <TextField label='Type (Enter Income Or Expense)' variant='outlined' value={type} onChange={(e) => setType(e.target.value)} error={typeError}/>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label='Category' variant='outlined' value={category} onChange={(e) => setCategory(e.target.value)} error={categoryError}/>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField label='Amount' variant='outlined' type='number'value={amount} onChange={(e) => setAmount(e.target.value)} error={amountError}/>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField variant='outlined' type='date' value={date} onChange={(e) => setDate(e.target.value)} error={dateError}/>
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        
    </Box>
  )
  
};

export default Add;
