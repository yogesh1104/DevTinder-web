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
        if (feed) return
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
            console.log(res)
            dispatch(addFeed(res.data))
        } catch (error) {
            console.log("ERROR ", error.message)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])

    if(!feed) return

    if(feed.length == 0) return <h2 className="flex justify-center my-10">No more user available</h2>
    return (
        <div className="flex justify-center">
            {feed && <UserCard user={feed[0]} button={false}/>}
        </div>
    )
}

export default Feed