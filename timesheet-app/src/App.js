import './App.css';
import Filter from './Components/Filter';
import Nav from './Components/Nav'




function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"></link>
      <Nav></Nav>
      <Filter></Filter>
     
    </div>
  );
}

export default App;
