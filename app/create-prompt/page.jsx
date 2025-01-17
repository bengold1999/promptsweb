"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ title:"", prompt: "", tag: "", like: [], dislike: [],which :'' });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
        title: post.title,
        like: post.like,
        dislike: post.dislike,
        which: post.which,
      };
      console.log('Sending data:', postData);

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify(postData),
      });
      console.log('Response:', response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
