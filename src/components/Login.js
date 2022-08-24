
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { toast } from "react-toastify";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = (auth, email, password) => {
        createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            // ..
            });
    }
    
    
   
    const signIn = (auth, email, password) => {
        console.log ("ENTRE");

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return signInWithEmailAndPassword(auth, email, password).then(
                    (userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        // ...
                    }).catch((error) => {
                        toast("Invalid login", {
                            type: "warning",
                          });
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
            })
            .catch((error) => {
                
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        
        
    }


    const handleEmailChange = ({ target: { name, value } }) => {
        setEmail(value);
    };

    const handlePasswordChange = ({ target: { name, value } }) => {
        setPassword(value);
    };

    return (

        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" value={email} onChange={handleEmailChange} required="" autofocus=""/>
                <label for="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required=""/>
                <br/>
                <button className="btn btn-lg btn-primary btn-block" onClick={(e) => {e.preventDefault(); signIn(auth,email,password)}}>Sign in</button>
            </form>
        </div>    
    );

}

export default Login;