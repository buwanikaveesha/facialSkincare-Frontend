import { Route, Routes } from 'react-router-dom';
import Features from './components/Features/Features';
import Home from './components/Home/Home';
import HowToDo from './components/HowToDo/HowToDo';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path='/navbar' exact element={<Navbar />} />
      <Route path='/features' exact element={<Features />} />
      <Route path='/howToDo' exact element={<HowToDo />} />
    </Routes>
  );
}

export default App;
