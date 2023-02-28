import { Icon } from '@iconify/react';
import uiUserProfile from '@iconify/icons-healthicons/ui-user-profile';
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/Navbar.css'
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const navigate = useNavigate()

    return (
        <div className="navbar-container">

            <div className='navbar-child logo-container' onClick={() => navigate("/")}><p>BLOG</p></div>
            {!user && <div className='signup-div' onClick={() => navigate("/signup")}><p>SignUp</p></div>}
            {!user && <div className='login-div' onClick={() => navigate("/login")}><p>Login</p></div>}

            {user && <div className={!user ? "navbar-child profile-container" : "navbar-child profile-container-2"}>

                <div className="user-icon-div"><Icon className='profile-icon' icon={uiUserProfile} /></div>

                {user && <div className="username-div"><p>{user.username}</p></div>}

            </div>}
            {user && <div className='logout-div'><button className='logout-btn' onClick={() => logout()}>Logout</button></div>}
        </div>
    )
}

export default Navbar