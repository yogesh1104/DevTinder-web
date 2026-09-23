import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
const Login = () => {

    const [emailId, setEmailid] = useState("shubham@gmail.com")
    const [password, setPassword] = useState("Shubham@123")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async () => {
        try {
            const res = await axios.post( BASE_URL + "/login", { emailId, password } , { withCredentials: true }  )
            dispatch(addUser(res.data.data))
            return navigate("/")
        } catch (error) {
            console.log("ERROR", error.message)
        }
    }
    return (
        <div className="flex justify-center my-4">
            <div className="card card-border bg-base-300 w-96 ">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="name">Email</label>
                            <input type="text" id="name" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailid(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label" htmlFor="name">Password</label>
                            <input type="text" id="name" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login