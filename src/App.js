import Page1 from './Components/Page1';
import NavBar from './Components/NavBar';
import './App.css';

function App() {
  return (
    // this is the starting point of project which displays navigation bar and first page
    <div className="App">
      <div className='nav'><NavBar/></div>
      <div className='page1'><Page1 /></div>
    </div>
  );
}

export default App;
