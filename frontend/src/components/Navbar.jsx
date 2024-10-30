import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; 

function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "", { path: '/' }); 
        window.localStorage.removeItem("userID"); 
        navigate("/auth"); // Redirect to the auth page after logout
    };

    return (
        <div className="navbar">
            {!cookies.access_token ? (
                <>
                    <Link to="/" className="nav-link">EazyEats</Link>
                    <Link to="/auth" className="nav-link">Login/Register</Link>
                </>
            ) : (
                <>
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/createRecipe" className="nav-link">Create Recipe</Link>
                    <Link to="/savedRecipe" className="nav-link">Saved Recipes</Link>
                    <button onClick={logout} className="logout-button">Logout</button>
                </>
            )}
        </div>
    );
}

export default Navbar;
