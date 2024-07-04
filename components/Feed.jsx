'use client'

import { useState, useEffect } from 'react'
import PromotCard from './PromotCard.jsx'

const PromotCardList = ({ key,data, handleTagClick }) => {
console.log('dataaaa:',data) 
 return (
    <div className='mt-16 '>
      {data.map((post) => (
        <PromotCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/prompt')
        const data = await res.json()
        console.log('Fetched posts:', data) 
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className='search_input'
          value={search}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromotCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed

// PromotCard.jsx



