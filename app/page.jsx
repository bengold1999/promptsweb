import React from 'react'
import Feed from '@components/Feed.jsx'

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center'>Discover and share
                <br className='max-md:hidden'/>
                <span className='green_gradient  flex align-middle justify-center'>AI prompts</span>

            </h1>
            <p className='desc text-center'>Prompts Web is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>

            <Feed />
        </section>
    )
}

export default Home
