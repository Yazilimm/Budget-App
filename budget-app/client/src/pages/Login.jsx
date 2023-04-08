import {useEffect, useState} from 'react'
import { isAuthenticated } from '../handlers/authHandler'
import { useNavigate } from 'react-router-dom'
import bgImage from '../asset/images/bg-image.jpg'
import {Box,Card,FormControl,TextField,Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import authApi from '../api/authApi'
const Login = () => {
    const navigate =useNavigate()
    const [loginError, setLoginError] = useState()
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)
    useEffect(() => {
        const checkToken = async() =>{
            const res = await isAuthenticated()
            if(res){ return navigate('/login')}
        }
        checkToken()
    }, [])

    const loginSubmit = async () =>{
       if(onSubmit){ return }
        setLoginError(undefined)

        const checkError = {
            username: username.trim().length === 0,
            password: password.trim().length === 0,

        }
        setUsernameError(checkError.username)
        setPasswordError(checkError.password)
           
        if(checkError.username || checkError.password){return}

        const params ={
            username,
            password
        }
        setOnSubmit(true)

        try {
            const res = await authApi.login(params)
            localStorage.setItem('token', res.token)
            setOnSubmit(false)
            navigate('/')
        } catch (error) {
            if(error.response.status === 401){
                setLoginError(error.response.data)
            }
            setOnSubmit(false)
        }
    }
    return (
        <Box sx={{height:'100vh',display:'flex',justifyContent:'flex-start',backgroundImage:`url(${bgImage})`,backgroundSize:'cover',backgroundPosition:'right'}}>
            <Card sx={{width:'100%',maxWidth:'600px'}}>
                <Box sx={{height:'100%',width:'100%',maxWidth:'400px','& .MuiTextField-root':{mb:5},display:'flex',alignItems:'center',justifyContent:'flex-start',flexDirection:'column',margin:'auto',padding:'5rem 1rem'}}>
                    <Typography variant='h5' textAlign='center' mb='4rem' fontWeight='700'>
                        BUDGET APP
                    </Typography>
                    <FormControl fullWidth>
                        <TextField label='Username' variant='outlined' value={username} onChange={(e)=>setUsername(e.target.value)} error={usernameError}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField label='Password' type='password' variant='outlined' value={password} onChange={(e)=>setPassword(e.target.value)} error={passwordError}/>
                    </FormControl>
                    {
                        loginError && <FormControl>
                            <Typography color='error'>
                                {loginError}
                            </Typography>
                        </FormControl>
                    }
                    <LoadingButton variant='contained'fullWidth size='large' sx={{marginTop:'1rem'}} onClick={loginSubmit}>
                        Sign In
                    </LoadingButton>
                </Box>
            </Card>
        </Box>
    )
}

export default Login
