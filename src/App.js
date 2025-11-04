import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './routes/Dashboard';
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import { Login } from './routes/Login';
import { useEffect } from 'react';
import { ServiceProvider, ViewProvider } from './context/ViewNavigatorContext';

function App() {

  const MockedUser = {
    id: 101,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "doctor",
    phone: "+1 555-123-4567",
    address: "123 Main Street, Berlin, Germany",
    createdAt: "2025-10-29T10:00:00Z",
    isActive: true,
    balance: {
      id: 1,
      year: 2025,
      initialDays: 2,
      accumulatedDays: 10,
      used: 0,
      daysLeft: 12
    }
};
  useEffect(()=>{
    if(localStorage.getItem("user") === null){
      localStorage.setItem("user",JSON.stringify(MockedUser))
    }
  },[MockedUser])

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/dashboard' element={
        <ServiceProvider>
          <Dashboard/>
        </ServiceProvider>
        }/>
      <Route path='/' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
