//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Aggr from './pages/Aggr';
import Home from './pages/Home';

function App() {
  return ( 
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/aggr' element={<Aggr/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
