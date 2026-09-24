import { useState } from "react"
import UserCard from "./UserCard"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user , button}) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [error, setError] = useState("")
    const [toast , setToast] = useState(false)
    const dispatch = useDispatch()
    const handleSave = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true })
            dispatch(addUser(res.data?.data))
            setToast(true)
            setTimeout(() => setToast(false) , 2000)
        } catch (error) {
            if (error.status === 401) {
                setError(error.response.data)
            }
            console.log("ERROR ", error.response)
        }
    }
    return (
        <div className="flex justify-center">
            <div className="flex justify-center my-4 mx-4">
                <div className="card card-border bg-base-300 w-96 ">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Login</h2>
                        <div>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">First Name</label>
                                <input type="text" id="name" className="input" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Last Name</label>
                                <input type="text" id="name" className="input" placeholder="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Photo Url</label>
                                <input type="text" id="name" className="input" placeholder="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Age</label>
                                <input type="text" id="name" className="input" placeholder="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Gender</label>
                                <input type="text" id="name" className="input" placeholder="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">About</label>
                                <input type="text" id="name" className="input" placeholder="about" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} button = {button}/>
            {toast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile save successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile