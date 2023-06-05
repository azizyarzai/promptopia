"use client";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [posts, setPosts] = useState<any>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (prompt: any) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };
  const handleDelete = async (prompt: any) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;
    try {
      const res = await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const newPosts = posts.filter((p: any) => p._id !== prompt._id);
        setPosts(newPosts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch(
          `/api/users/${(session?.user as any).id}/posts`
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if ((session?.user as any)?.id) fetchPrompts();
  }, [session?.user]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
