import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import './PostFeed.css';
import { Link, useParams } from 'react-router-dom';

const PostFeed = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [selectedTag, setSelectedTag] = useState(''); // State for tag filtering
    const [allTags, setAllTags] = useState([]); // State to store all unique tags
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/posts');
                setPosts(response.data.posts);

                // Collect unique tags from posts for the dropdown
                const uniqueTags = [...new Set(response.data.posts.flatMap((post) => post.tags))];
                setAllTags(uniqueTags);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Filter posts by search query and selected tag
    const filteredPosts = posts.filter((post) => {
        const searchLower = searchQuery.toLowerCase().trim();
        const titleLower = post.title.toLowerCase();
        const bodyLower = post.body.toLowerCase();
        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

        return (
            (titleLower.includes(searchLower) || bodyLower.includes(searchLower)) && matchesTag
        );
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortOption === 'likes') {
            return b.reactions.likes - a.reactions.likes;
        }
        return 0;
    });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    return (
        <div className="post-feed">
            <h1 className='username'>Welcome {username}</h1>
            <h1>Post Feed</h1>

            {/* Search, Sort, and Tag Filter Container */}
            <div className="filter-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort Dropdown */}
                <select
                    className="sort-dropdown"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="default">Sort by Default</option>
                    <option value="likes">Sort by Likes</option>
                </select>

                {/* Tag Filter Dropdown */}
                <select
                    className="tag-dropdown"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                >
                    <option value="">Filter by Tag</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid-container">
                {currentPosts.map((post) => (
                    <div key={post.id} className="post-card">
                        <Link to={`/post/${post.id}`} className="post-content-link">
                            <div className="post-content">
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>
                        </Link>
                        <div className="post-details">
                            <div className="reactions">
                                <span className="like">
                                    <FaHeart /> {post.reactions?.likes || 0}
                                </span>
                                <span className="dislike">
                                    <FaThumbsDown /> {post.reactions?.dislikes || 0}
                                </span>
                            </div>
                            <p className='tags'>Tags: {post.tags.join(', ')}</p> {/* Tag names still visible on post */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostFeed;
