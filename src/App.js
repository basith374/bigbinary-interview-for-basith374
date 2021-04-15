import logo from './logo.svg';
import './App.css';
import Launches from 'components/views/Launches';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-content">  
        <Launches />
      </div>
    </div>
  );
}

export default App;
