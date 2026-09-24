import { useDispatch } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { removeUserFromFeed } from "../utils/feedSlice"
import axios from "axios"

const UserCard = ({ user , button}) => {
    const { _id , firstName, lastName, age, gender, photoUrl, about } = user
    console.log(user)
    const dispatch = useDispatch()

    const handleUserCard = async (status,_id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id , {} , {withCredentials : true});
            dispatch(removeUserFromFeed(_id))
        } catch (error) {
            console.log("ERROR" , error.response)
        }
    }

    return (
        <div className="justify-center">
            <div className="card bg-base-300 w-96 shadow-sm my-5 flex justify-center">
            <figure>
                {console.log(photoUrl)}
                <img src={photoUrl} alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age + "," + gender}</p>}
                {!button && 
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => handleUserCard("ignored" , _id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleUserCard("interested" , _id)}>Interested</button>
                </div>}
            </div>
        </div>
        </div>
    )
}

export default UserCard