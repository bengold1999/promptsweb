"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [likes, setLikes] = useState(post.like);
  const [dislikes, setDislikes] = useState(post.dislike);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const updateLikeDislike = async (type) => {
    try {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "PATCHLIKE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setLikes(updatedPost.like);
        setDislikes(updatedPost.dislike);
      } else {
        console.error('Failed to update likes/dislikes');
      }
    } catch (error) {
      console.error('Error updating likes/dislikes:', error);
    }
  };

  const handleLike = () => updateLikeDislike('like');
  const handleDislike = () => updateLikeDislike('dislike');

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-white'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <h3>{post.title}</h3>
      <p className='my-4 font-satoshi text-sm text-white'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      
      <div className='mt-5 flex-center gap-4'>
        <Image
          onClick={handleLike}
          src="/assets/icons/thumbs-up-solid.svg"
          width={20}
          height={20}
          alt="likes"
          className="w-10 h-10 bg-white rounded-full p-2 cursor-pointer"
        />
        <span>{likes}</span>
        <Image
          onClick={handleDislike}
          src="/assets/icons/thumbs-down-solid.svg"
          width={20}
          height={20}
          alt="dislikes"
          className="w-10 h-10 bg-white rounded-full p-2 cursor-pointer"
        />
        <span>{dislikes}</span>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          { <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p> }
        </div>
      )}
    </div>
  );
};

export default PromptCard;
