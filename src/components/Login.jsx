import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
const Login = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailId, setEmailid] = useState("")
    const [password, setPassword] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true })
            dispatch(addUser(res.data.data))
            return navigate("/")
        } catch (error) {
            if (error.status === 401) {
                setError(error.response.data)
            }
            console.log("ERROR", error.response)
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password }, { withCredentials: true })
            dispatch(addUser(res.data.data))
            return navigate("/profile")
        } catch (error) {
            console.log("ERROR", error.response)
        }
    }
    return (
        <div className="flex justify-center my-4">
            <div className="card card-border bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div>
                        {!isLoginForm && <><fieldset className="fieldset">
                            <label className="label" htmlFor="name">First name</label>
                            <input type="text" id="name" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Last Name</label>
                                <input type="text" id="name" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset></>}
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="name">Email</label>
                            <input type="text" id="name" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailid(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="name">Password</label>
                            <input type="text" id="name" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className="cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Sign Up" : "Existing User? Login"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login