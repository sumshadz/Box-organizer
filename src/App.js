import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import NavBar from './Components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='nav'><NavBar/></div>
      {/* <div className='page1'><Page1/></div> */}
      <div className='page2'><Page2/></div>
    </div>
  );
}

export default App;
