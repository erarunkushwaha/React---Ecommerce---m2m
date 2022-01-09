import "./header.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import Cart from "./Cart";
import CustomButton from "./CustomButton";

import Badge from '@mui/material/Badge';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {  signOut } from "firebase/auth";

import {
    Link, Navigate, useNavigate
} from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    searchIcon: {
        position: 'absolute',
        right: '1rem',
        top: '.6rem',
        fontSize: '2rem',
        color: "rgb(91, 202, 169)",


    },
    searchIconMobile: {
        position: 'absolute',
        right: '1rem',
        top: '.4rem',
        fontSize: '2rem',
        color: "rgb(91, 202, 169)",
    }
}));


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    const classes = useStyles();

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.

            dispatch({
                type: "LOGOUT",
                playload: null
            })
            navigate('/')
        }).catch((error) => {
            // An error happened.


        });


    }

    const nowork = () => {
        return;
    }


    return (
        <>
            <div className='NavContainer'>

                <div className="LeftSection">
                    <h1 className="logo">AK-STORE</h1>
                    <div className="searchSection">
                        <input type="text" className="inputField" />
                        <SearchIcon sx={ { fontSize: 25 } } color="red" className={ classes.searchIcon } />
                    </div>
                </div>
                <div className="RightSection">
                    { user && (
                        <>
                            <CustomButton logout={ nowork } avatar={ "yes" } text={ user.displayName } icon={ <Avatar sx={ { width: 27, height: 27 } } src={ user.photoURL } /> } />
                            <CustomButton logout={ logout } text="LOGOUT" icon={ <PersonIcon fontSize="large" /> } />
                            <Link to="/admin/dashboard">
                            <h1>DAS</h1>
                            </Link>
                        </>
                    ) }
                    { !user && (
                        <> <CustomButton logout={ logout } text="LOGIN" icon={ <PersonIcon fontSize="large" /> } />
                            <Link to="/register">
                                <CustomButton logout={ nowork } text="REGISTER" icon={ <PersonIcon fontSize="large" /> } />
                            </Link></>
                    ) }


                    { user && (<Cart />) }
                </div>
            </div>

            <div className="mobileContainer">
                <div className="upperSection">
                    <div className="leftSection">
                        <span className="menuIcon"><MenuIcon sx={ { fontSize: 25 } } /></span>
                        <h1 className="logo">AK-STORE</h1>
                    </div>
                    <div className="rightSection">
                        <div className="cart">
                            <Badge badgeContent={ 4 } color="error">
                                <ShoppingCartIcon sx={ { fontSize: 25 } } />
                            </Badge>
                        </div>
                        <button className="login">Login</button>
                        <button className="login">Register</button>
                    </div>
                </div>
                <div className="lowerSection">

                    <input type="text" className="inputField" />
                    <SearchIcon sx={ { fontSize: 25 } } color="red" className={ classes.searchIconMobile } />

                </div>
            </div>
        </>
    )
}

export default Header
