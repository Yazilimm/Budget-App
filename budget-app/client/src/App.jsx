import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login, AppLayout, Dashboard,  TransactionList, Add} from './pages/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="" element={<AppLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/transactionlist' index element={<TransactionList/>}/>
          <Route path='/add' index element={<Add/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
