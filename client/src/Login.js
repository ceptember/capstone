import { useState } from 'react'

function Login (){

    // const [newFirstName, setNewFirstName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newUsername, setNewUsername ] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")


    return (
        <div>
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

                <form>
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

