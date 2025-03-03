import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../mock/mockApi';
import PostItem from './PostItem';
import AddPost from './AddPost';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data.map(post => ({ ...post, comments: post.comments || [] }))); // ← Assicura che comments sia sempre un array
      setLoading(false);
    });
  }, []);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, { id: prevPosts.length + 1, likes: 0, comments: [], ...newPost }]);
  };

  const handleEditPost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    );
  };

  const handleAddComment = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      )
    );
  };

  if (loading) return <p>Caricamento in corso...</p>;

  return (
    <div>
      <AddPost onAddPost={handleAddPost} />
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          onLike={handleLikePost}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
};

export default PostList;
