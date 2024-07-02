import Link from 'next/link'

const Form = ({ type, post, setPos, submitting, handleSubmit }) => {
  return (
    <section className=' w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='green_gradient text-center'>{type}</span></h1>
      <p className='desc text-left'>{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform</p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism'
      />
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) => setPos({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea' ></textarea>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {''}
          </span>
          <span className='font-normal'> #product #more</span>
        </label>
        <input
          value={post.tag}
          onChange={(e) => setPos({ ...post, tag: e.target.value })}
          placeholder='#tag'
          required
          className='form_input' ></input>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-gray-500 text-sm'>
              Cancel
            </Link>
            <button
            type='submit'
            disabled={submitting}
            className='px5 py-1.5 text-sm black_btn rounded-full text-white' >
              {submitting ? `${type}...` : type}
            </button>
          </div>
    </section>
  )
}

export default Form