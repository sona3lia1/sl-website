import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const postsSample = [
  {
    id: 1,
    author: "Alice",
    content: "Just finished my science project! 💡",
    image: "/science.jpg",
    tags: ["#science", "#school"],
    likes: 12,
    comments: [
      { user: "Bob", text: "Awesome work!" },
      { user: "Jane", text: "Looks great!" },
    ],
  },
];

export default function SchoolMediaApp() {
  const [posts, setPosts] = useState(postsSample);
  const [newPost, setNewPost] = useState({ content: "", tags: "", image: null });

  const handleNewPost = () => {
    if (!newPost.content.trim()) return;
    const newId = posts.length + 1;
    setPosts([
      {
        id: newId,
        author: "You",
        content: newPost.content,
        image: URL.createObjectURL(newPost.image),
        tags: newPost.tags.split(" "),
        likes: 0,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost({ content: "", tags: "", image: null });
  };
}