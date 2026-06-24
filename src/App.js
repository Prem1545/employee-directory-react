import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<EmployeeDirectory/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
