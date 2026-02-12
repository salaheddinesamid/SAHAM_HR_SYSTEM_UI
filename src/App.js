import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './routes/Dashboard';
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect } from 'react';
import { ServiceProvider, ViewProvider } from './context/ViewNavigatorContext';
import { ProtectedRoute } from './ProtectedRoute';
import WebSocketTester from './routes/WebSocketTest';
import { AltLogin } from './routes/AltLogin';
import { ForgotPassword } from './routes/ForgotPassword';
import { SetupPassword } from './routes/SetupPassword';

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
      <Route path='/' element={
        <ServiceProvider>
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        </ServiceProvider>
        }/>
      <Route path='/login' element={<AltLogin/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/setup-password' element={<SetupPassword/>}/>
      <Route path='/websocket' element={<WebSocketTester/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
