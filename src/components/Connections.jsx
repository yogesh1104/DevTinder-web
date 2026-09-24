import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"

const Connections = () => {

    const dispatch = useDispatch()
    const connection = useSelector(store => store.connection)
    const fetchConnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true })
            console.log(res.data.data)
            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.log("ERROR", error.message)
        }
    }

    useEffect(() => {
        fetchConnection()
    }, [])

    if (connection == null) return

    if (connection.length == 0) return "You have no Connection"

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {
                connection.map((user) => {
                    return (
                        <div className="card bg-base-100 w-60 shadow-sm">
                            <figure className="px-10 pt-10">
                                <img
                                    src={user.photoUrl}
                                    alt="user"
                                    className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h4 className="card-title">{user.firstName + " " + user.lastName}</h4>
                                <p>{user.about}</p>
                                {user.age && user.gender && <p>{user.age + " , " + user.gender}</p>}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections