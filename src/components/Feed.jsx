import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)
    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
            dispatch(addFeed(res.data))
        } catch (error) {
            console.log("ERROR ", error.message)
        }
    }
    useEffect(() => {
        if (!feed) {
            getFeed()
        }
    }, [])
    return (
        <div className="flex justify-center">
            {feed && <UserCard user={feed[0]} />}
        </div>
    )
}

export default Feed