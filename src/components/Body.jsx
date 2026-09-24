import NavBar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.user)
    const fetchUser = async () => {
        if(user) return
        try {
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
            dispatch(addUser(res.data))
        } catch (error) {
            if(error.status === 401){
                return navigate("/login")
            }
            console.log(error.message)
        }
    }

    useEffect(() => {
            fetchUser()
    }, [])
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body