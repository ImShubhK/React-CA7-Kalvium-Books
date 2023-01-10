
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Books from './components/Books';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Books/>} /> 
        <Route path='/register' element={<Signup />} /> 
      </Routes>
    </div>
  );
}

export default App;
