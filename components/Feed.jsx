'use client'

import { useState, useEffect } from 'react'

import PromotCard from './PromotCard'

const PromotCardList =({data , handleTagClick}) => {

  return (  
    <div className='mt-16'>
      {data?.map((post) => (
        <PromotCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [search, setSearch] = useState('')
  const handleSearchChange = (e) => {
    // setSearch(e.target.value)
  }

  useEffect(() => {
    
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text"
          placeholder="Search for a tag or a username"
          className='search_input'
          value={search}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromotCardList />
    </section >
  )
}

export default Feed
