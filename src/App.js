import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import auth from './firebase.init';
import AddNote from './pages/AddNote/AddNote';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/Login';
import MyNotes from './pages/MyNotes/MyNotes';
import SignUp from './pages/SignUpPage/SignUp';
import UpdateNote from './pages/UpdateNote/UpdateNote';


function App() {
  const [user] = useAuthState(auth);
  return (
    <div className='bg-white'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={user ? <MyNotes /> : <LandingPage />}></Route>
          <Route path='/signin' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/mynotes' element={user? <MyNotes /> : <LandingPage />}></Route>
          <Route path='/add-note' element={<AddNote />}></Route>
          <Route path='/update-note/:id' element={<UpdateNote />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;


