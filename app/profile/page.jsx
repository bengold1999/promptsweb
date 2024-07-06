'use client'

import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

const page = () => {

  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching user:', session?.user.id)
        const res = await fetch(`/api/users/${session?.user.id}/posts`)
        console.log('Fetching posts:', res)
        const data = await res.json()
        console.log('Fetched posts:', data)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    if (session?.user.id) fetchPosts()
  }, [session?.user.id])
  const handleEdit = async (post) => {
    // router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    // const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
    // if (hasConfirmed) {
    //     try {
    //         await fetch(`/api/prompt/${post._id.toString()}`, {
    //             method: 'DELETE',
    //         })
    //         router.push('/')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
  }


  return (
    <Profile
      name='my'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of OpenAI.'
      data={posts}
      handleEdit={() => { }}
      handleDelete={() => { }}
    />
  )
}

export default page
