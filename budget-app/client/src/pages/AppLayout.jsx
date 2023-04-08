import {useEffect, useState} from 'react'
import { isAuthenticated } from '../handlers/authHandler'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { Loading ,Sidebar,TopNav } from '../components';
import { Box, colors, Toolbar } from '@mui/material';
const AppLayout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
       const checkToken = async() =>{
           const res = await isAuthenticated()
           if(!res){ return navigate('/login')}
           setIsLoading(false)
       }
       checkToken()
    }, [])
    return (
        isLoading ? (
            <Box sx={{width:'100%',height:'100vh'}}>
                 <Loading/>
            </Box>
           
        ) : (
            <Box>
                <TopNav/>
                <Box sx={{display:'flex'}}>
                    <Sidebar/>
                    <Box component='main' sx={{flexGrow:1, p:3,backgroundColor: colors.grey['100'], width:'Max Content'}}>
                        <Toolbar/>
                        <Outlet/>
                    </Box>
                </Box>
            </Box>
        )
        
    )
}

export default AppLayout
