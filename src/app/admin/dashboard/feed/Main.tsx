'use client'

import React, { useState } from 'react';
import { FaUserCircle, FaThumbsUp, FaShare, FaComment, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons

const Feed = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([]); // State to store all posts
    const [showPollModal, setShowPollModal] = useState(false); // State to control the poll modal visibility
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOption1, setPollOption1] = useState('');
    const [pollOption2, setPollOption2] = useState('');
    const [pollTimeline, setPollTimeline] = useState('');

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleAddNewField = () => {
        setShowModal(true);
    };

    const handlePost = (postData) => {
        setPosts([postData, ...posts]);
        setShowModal(false);
        setShowPollModal(false);
    };

    const handleImageUpload = (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        handlePost({ type: 'image', content: imageUrl });
    };

    const handlePollCreation = () => {
        setShowPollModal(true);
    };

    const handleEventCreation = () => {
        handlePost({ type: 'event', content: 'Event created' });
    };

    const handlePollSubmit = (e) => {
        e.preventDefault();
        if (pollQuestion.trim() !== '' && pollOption1.trim() !== '' && pollOption2.trim() !== '' && pollTimeline.trim() !== '') {
            handlePost({
                type: 'poll',
                content: {
                    question: pollQuestion,
                    options: [pollOption1, pollOption2],
                    timeline: pollTimeline
                }
            });
            setPollQuestion('');
            setPollOption1('');
            setPollOption2('');
            setPollTimeline('');
        } else {
            alert('Please fill out all fields before submitting the poll.');
        }
    };

    return (
        <div className="feed-page bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Feed</h1>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddNewField}
            >
                Start a Post
            </button>

            {/* Modal for posting */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg w-1/2 relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Create a post</h2>
                        <form className="space-y-4">
                            <textarea
                                placeholder="What do you want to talk about?"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            />

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handlePollCreation}
                                >
                                    Create Poll
                                </button>
                                <button
                                    type="button"
                                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleEventCreation}
                                >
                                    Create Event
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePost({ type: 'comment', content: newComment });
                                        setNewComment('');
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Poll Modal */}
            {showPollModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg w-1/2 relative">
                        <button
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowPollModal(false)}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Create a Poll</h2>
                        <form className="space-y-4" onSubmit={handlePollSubmit}>
                            <input
                                type="text"
                                placeholder="Poll Question"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={pollQuestion}
                                onChange={(e) => setPollQuestion(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Option 1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={pollOption1}
                                onChange={(e) => setPollOption1(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Option 2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={pollOption2}
                                onChange={(e) => setPollOption2(e.target.value)}
                            />
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={pollTimeline}
                                onChange={(e) => setPollTimeline(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit Poll
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Existing posts */}
            {posts.map((post, index) => (
                <div key={index} className="feed-post-cont-wrap bg-white rounded-lg shadow-md p-4 my-4">
                    <div className="feed-post-title-block flex items-center">
                        <FaUserCircle className="text-4xl mr-4" />
                        <div>
                            <h3 className="text-lg font-bold">Username</h3>
                            <p className="text-gray-500 text-sm">2 hours ago</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        {/* Post content based on type */}
                        {post.type === 'comment' && (
                            <div className="feed-post-text-block">
                                <p className="feed-post-title">{post.content}</p>
                            </div>
                        )}
                        {post.type === 'image' && (
                            <div className="feed-post-image">
                                <img src={post.content} alt="Uploaded" className="w-full h-auto rounded-lg" />
                            </div>
                        )}
                        {post.type === 'poll' && (
                            <div className="feed-post-poll">
                                <p className="text-lg font-bold">{post.content.question}</p>
                                <ul>
                                    {post.content.options.map((option, idx) => (
                                        <li key={idx}>{option}</li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500">Poll ends at: {post.content.timeline}</p>
                            </div>
                        )}
                        {post.type === 'event' && (
                            <div className="feed-post-event">
                                <p className="text-lg font-bold">Event</p>
                                <p>{post.content}</p>
                                {/* Add event details and RSVP options */}
                            </div>
                        )}
                    </div>
                    <div className="post-actions mt-4 flex justify-between">
                        <span className="post-action flex items-center" onClick={handleLike} style={{ cursor: 'pointer' }}>
                            <FaThumbsUp className="mr-1" />
                            Like {likes > 0 && `(${likes})`}
                        </span>
                        <span className="post-action flex items-center" onClick={handleShare} style={{ cursor: 'pointer' }}>
                            <FaShare className="mr-1" />
                            Share
                        </span>
                        <span className="post-action flex items-center" style={{ cursor: 'pointer' }}>
                            <FaComment className="mr-1" />
                            Comment {comments.length > 0 && `(${comments.length})`}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feed;
