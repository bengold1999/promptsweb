'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false)
  const [pos, setPos] = useState({
    prompt: '',
    tag: ''
  })
  const { data: session } = useSession()
  const router = useRouter()
  const CreatePrompt = async(e) => {
    e.preventDefault()
    setSubmitting(true)

    try{
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: pos.prompt,
          userId: session?.user.id||'not connected',
          tag: pos.tag
        })
      })
      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form
      type='Create'
      post={pos}
      setPos={setPos}
      submitting={submitting}
      handleSubmit={CreatePrompt}
    />


  )
}

export default CreatePrompt
