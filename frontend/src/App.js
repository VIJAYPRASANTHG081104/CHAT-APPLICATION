import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProtectedRoutes><Chat/></ProtectedRoutes>}/>
        <Route path='/setAvatar' element={<SetAvatar/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('chat-app-user')){
    return props.children;
  }
  else{
    return <Navigate to='/login' />
  }
}

export default App;
