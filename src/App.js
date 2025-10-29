import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './routes/Dashboard';
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import { Login } from './routes/Login';

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/' element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
