"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPromptContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "", title: "", like: [], dislike: [] });

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({ prompt: data.prompt, tag: data.tag });
        }

        if (promptId) getPromptDetails();
    }, [promptId]);

    const editPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    title: post.title,
                    like: post.like,
                    dislike: post.dislike,
                    which: post.which
                }),
            });

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
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    );
};

const EditPrompt = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditPromptContent />
        </Suspense>
    );
};

export default EditPrompt;