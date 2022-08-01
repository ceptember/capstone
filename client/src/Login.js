import { useState, useEffect } from 'react'

function Login ({handleLogout}){

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

    function submitLogin (e){
        e.preventDefault(); 
        fetch("/login", {
          method: "POST", 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password})
        }).then( (r) => {
            if (r.ok) {
              r.json().then((data) => {
              //  setUser(data)
                setUsername("")
                setPassword("")
              });
            } else {
              r.json().then((err) => {
                console.log(err)
              });
            }
        }) 
      }

      // function handleLogout(){
      //   fetch("/logout",{
      //     method: "DELETE"
      //   })
      //  .then(setUser(null))
      // }

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
            .then(data =>  console.log(newUserObj))

        setNewEmail("")
        setNewUsername("")
        setNewPassword("")
        setNewConfirmPassword("")
    }

    return (
        <div>
            {/* <h2>  {user ? "Welcome, " + user.username + "!": ""}</h2> */}
            Existing Users Log In
            <form onSubmit={e => submitLogin(e)}>
                Username: <input value={username} onChange={ e => setUsername(e.target.value)}></input> <br />
                Password: <input value={password} onChange={e => setPassword(e.target.value)}></input> <br />
                forgot password? <br />
                <input type ="submit"></input>
            </form>

            <button onClick={handleLogout}>Logout</button>

            <br />
            New Users Sign Up
            <br />

                <form onSubmit={e => handleSignup(e)}>
                    {/* First Name: <input value={newFirstName} onChange={e=> setNewFirstName(e.target.value)}></input> {newFirstName} <br />
                    Last Name: <input></input> <br /> */}
                    Username: <input value={newUsername} onChange={e => setNewUsername(e.target.value)}></input> {newUsername}<br />
                    Email: <input value={newEmail} onChange={e => setNewEmail(e.target.value)}></input> {newEmail} <br />
                    Password: <input type="password" value={newPassword} onChange={ e => setNewPassword(e.target.value)}></input> {newPassword} <br />
                    Confirm Password:  <input type="password" value={newConfirmPassword} onChange={ e => setNewConfirmPassword(e.target.value)}></input> {newConfirmPassword} 
                    {newPassword != newConfirmPassword && newConfirmPassword.length > 0 ? "Password must match" : ""}
                    <br />
                    Choose your membership plan: I'll figure out options later. <br />
                    <input type ="submit"></input>
                </form>

        </div>
    )
}

export default Login;

