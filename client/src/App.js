
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import About from './About';
import Login from './Login'; 
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Project 5
      </header>

    <Header />

    {/* need routing  */}

    <Home />
    {/* <About /> */}
    <Login /> 

    <Footer />

    </div>
  );
}

export default App;
