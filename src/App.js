import Login from './Components/Login';
import Signup from './Components/Signup';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './index.css'
import Navbar from './Components/Navbar';
import Blog from './Components/Blog';
import PostBlog from './Components/PostBlog';
import UpdateBlog from './Components/UpdateBlog';
import Error404 from './Components/Error404';
import YourBlogs from './Components/YourBlogs';
import { useAuthContext } from './hooks/useAuthContext';

function App() { 
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<Blog />} path="/"/>
        <Route element={!user ? <Login /> : <Blog />} path="/login"/>
        <Route element={!user ? <Signup /> : <Blog />} path="/signup"/>
        <Route element={user ? <PostBlog /> : <Signup />} path="/postblog"/>
        {localStorage.getItem('update') && <Route element={<UpdateBlog />} path="/updateblog"/>}
        <Route element={user ? <YourBlogs /> : <Signup />} path="yourblogs"/>
        <Route element={<Error404 />} path="*"/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
