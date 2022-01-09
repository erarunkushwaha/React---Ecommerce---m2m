import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, provider } from '../../firebase';
import './register.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpateUser } from '../../function/auth';


const roleBasedRedirect = (res,navigate) => {
  if(res.user.role === 'admin'){
    navigate("/admin/dashboard")
  } else {
    navigate("/user/navigate")

  }
}



const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    if (user && user.accessToken) navigate('/');
  }, [user])

  const loginWithgoogle = async () => {

   const userInfo = await signInWithPopup(auth, provider);
    

      try {
       
        const token = await userInfo.user.accessToken
      createOrUpateUser(token).then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          playload: {
            displayName: res.data.user.name,
            email: res.data.user.name,
            accessToken : token,
            photoURL : res.data.user.picture,
            role:res.data.user.role,
            _id:res.data.user._id,
            uid : res.data.user.uid,
          },
        })

        roleBasedRedirect(res.data,navigate);
  
      }).catch((error) => console.log('error by fronted', error));
        
      } catch (error) {
        const errorMessage = error.message;
        // //   // The email of the user's account used.
        //   const email = error.email;
        // //   // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        console.log(credential);
        toast.error(errorMessage)
      }
  }

  return (
    <div className="registerContainer">

      <button onClick={ loginWithgoogle } className='google'>Login With Google { process.env.REACT_APP_API} </button>
    </div>
  )
}

export default Register
