import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './routes/Dashboard';
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Dashboard/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
