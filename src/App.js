import './App.css';
import JunkYardLayout from './Containers/JunkYardLayout/JunkYardLayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <JunkYardLayout/>
      </div>
    </BrowserRouter>
  );
}

export default App;
