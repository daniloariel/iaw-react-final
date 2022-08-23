import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  
  return (
    <div>
      <ToastContainer />
      <Navbar></Navbar>
      <Home></Home>
    </div>
    
  );
}

export default App;
