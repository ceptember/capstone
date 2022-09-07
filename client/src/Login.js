import { useState, useEffect } from 'react'

function Login ({handleLogout, submitLogin}){

    //for login
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //for signup
    const [newEmail, setNewEmail] = useState("")
    const [newUsername, setNewUsername ] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")
   
    //const [user, setUser] = useState(null); //this is duplicated, move to store 

    // useEffect(() => {
    //   fetch("/me").then((response) => {
    //     if (response.ok) {
    //       response.json().then((data) => setUser(data));
    //     }
    //   });
    // }, []);

    //Login function 

    function handleLogin (e){
        e.preventDefault(); 

        submitLogin(e, username, password)

        setUsername("")
        setPassword("")

      }



    function handleSignup(e){
        e.preventDefault()

        let newUserObj = {
            email: newEmail,
            username: newUsername, 
            password: newPassword,
            password_confirmation: newConfirmPassword
        }

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers:  { "Content-Type": "application/json"},
            body: JSON.stringify(newUserObj)
        })
            .then(resp => resp.json())
            .then(data =>  {
              console.log(newUserObj)
              submitLogin(e, newUserObj.username, newUserObj.password)
            })

        setNewEmail("")
        setNewUsername("")
        setNewPassword("")
        setNewConfirmPassword("")
    }

    return (
        <div class="main_component_holder">
            {/* <h2>  {user ? "Welcome, " + user.username + "!": ""}</h2> */}
            <h3>Existing Users Log In</h3>
            <form onSubmit={e => handleLogin(e)}>
                Username: <input value={username} onChange={ e => setUsername(e.target.value)}></input> <br />
                Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input> <br />
                forgot password? <br />
                <input type ="submit" class="submit_btn"></input>
            </form>

            {/* <button onClick={handleLogout}>Logout</button> */}

            <br /><br />
            <h3>New Users Sign Up</h3>

                <form onSubmit={e => handleSignup(e)}>
                    Username: <input value={newUsername} onChange={e => setNewUsername(e.target.value)}></input> <br />
                    Email: <input value={newEmail} onChange={e => setNewEmail(e.target.value)}></input>  <br />
                    Password: <input type="password" value={newPassword} onChange={ e => setNewPassword(e.target.value)}></input>  <br />
                    Confirm Password:  <input type="password" value={newConfirmPassword} onChange={ e => setNewConfirmPassword(e.target.value)}></input>
                    {newPassword != newConfirmPassword && newConfirmPassword.length > 0 ? "Password must match" : ""}
                    <br />
                   
                    <input type ="submit" class="submit_btn"></input>
                </form>
                <br />
                <br />

        </div>
    )
}

export default Login;

