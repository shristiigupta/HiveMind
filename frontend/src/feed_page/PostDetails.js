import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaThumbsDown, FaComment } from 'react-icons/fa';
import './PostDetails.css';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState(false); // State to toggle comments visibility

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postResponse = await axios.get(`https://dummyjson.com/posts/${postId}`);
                const commentsResponse = await axios.get(`https://dummyjson.com/posts/${postId}/comments`);

                setPost(postResponse.data);
                setComments(commentsResponse.data.comments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post details or comments:', error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (loading) {
        return <p>Loading post details...</p>;
    }

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <div className="post-details-container">
            <div className="post-card-details">
                <h1 className="post-title">{post.title}</h1>
                
                {/* Link to author profile */}
                <div className="post-author">
                    <strong>Author: </strong>
                    <Link to={`/user/${post.userId}`} className="author-link">
                        {post.user?.username || 'Unknown'}
                    </Link>
                </div>

                {post.image && <img className="post-image" src={post.image} alt={post.title} />}
                
                <p className="post-body">{post.body}</p>

                <div className="post-reactions">
                    <span className="like">
                        <FaHeart /> {post.reactions?.likes || 0}
                    </span>
                    <span className="dislike">
                        <FaThumbsDown /> {post.reactions?.dislikes || 0}
                    </span>
                    <span className="comment" onClick={() => setShowComments(!showComments)}>
                        <FaComment />   {comments.length} Comments
                    </span>
                </div>

                {/* Show comments only when the icon is clicked */}
                {showComments && (
                    <div>
                        <h2 className="comments-title"> Comments:</h2>
                        <ul className="comments-list">
                            {comments.map(comment => (
                                <li key={comment.id} className="comment-item">
                                    <strong>{comment.user.username}:</strong> {comment.body}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
