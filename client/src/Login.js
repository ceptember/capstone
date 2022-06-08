import { useState, useEffect } from 'react'

function Login (){

    // const [newFirstName, setNewFirstName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newUsername, setNewUsername ] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")

    const [testUsers, setTestUsers] = useState("no")
   
    //testing server connection, delete this later
    useEffect(()=>{
        fetch("http://localhost:3000/users")
            .then( r =>  r.json())
            .then( data => setTestUsers(data.hello)) 
    }, [])

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
            <h1>{testUsers}</h1>
            Existing Users Log In
            <form>
                Email: <input></input> <br />
                Password: <input></input> <br />
                forgot password? <br />
                <input type ="submit"></input>
            </form>

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

