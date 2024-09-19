'use client'

import { useEffect, useState } from "react"
import Profile from '@components/Profile'

const UserProfile = ({params}) => {
    const userId = params.id;
    console.log(userId);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          setUser(data);
        }
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`);
          const data = await response.json();
          setPosts(data);
        }
        if(userId) {
            fetchUser();
            fetchPosts();
        }
        }, [userId]);   


  return (
    <Profile 
        name={user?.username}
        desc={`Welcome to the ${user?.username} profile page`}
        data={posts}
        handleEdit={()=>{}}
        handleDelete={()=>{}}
    />
  )
}

export default UserProfile