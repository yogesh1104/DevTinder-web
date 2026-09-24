import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from "../utils/requestSlice"

const RequestConnection = () => {
    const request = useSelector(store => store.request)
    const dispatch = useDispatch()

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/receive", { withCredentials: true })
            dispatch(addRequest(res.data?.data))
        } catch (error) {
            console.log("ERROR ", error.response)
        }
    }

    const handleRequest = async (status,user) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + user.fromUserId._id , {} , {withCredentials : true})
            dispatch(removeRequest(user._id))
        } catch (error) {
            console.log("ERROR " , error.response)
        }
    }

    useEffect(() => {
        fetchRequest();
    }, [])

    if (!request) return

    if (request.length == 0) return <h2 className="flex justify-center my-4">You have no any request</h2>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {
                request.map((user) => {
                    return (
                        <div className="card bg-base-100 w-80 shadow-sm">
                            <figure className="px-10 pt-10">
                                <img
                                    src={user.fromUserId.photoUrl}
                                    alt="user"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h4 className="card-title">{user.fromUserId.firstName + " " + user.fromUserId.lastName}</h4>
                                <p>{user.fromUserId.about}</p>
                                {user.fromUserId.age && user.fromUserId.gender && <p>{user.fromUserId.age + " , " + user.fromUserId.gender}</p>}
                            </div>
                            <div className="card-actions justify-center">
                                <button className="btn btn-secondary" onClick={() => handleRequest("accepted" , user)}>Accept</button>
                                <button className="btn btn-primary" onClick={() => handleRequest("rejected" , user)}>Reject</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RequestConnection