
import {BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navigation from './Component/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
      </Router>
    </div>
  );
}

export default App;
