import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BlogPersonal from './BlogPersonal';
import UpdateBlog from './UpdateBlog';
import AddBlog from './AddBlog';

const AdminBlog = () => {
    const [showModal, setShowModal] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [editBlog, setEditBlog] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog');
                setBlogs(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog/${blogId}`);
                setBlogs(blogs.filter((blog) => blog.id !== blogId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleViewBlog = (blog) => {
        setSelectedBlog(blog);
    };

    const handleCloseView = () => {
        setSelectedBlog(null);
    };

    const handleEditBlog = (blog) => {
        setEditBlog(blog);
    };

    const handleCloseEdit = () => {
        setEditBlog(null);
    };

    const handleUpdateBlog = async (updatedBlog) => {
        try {
            const response = await axios.put(`https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog/${updatedBlog.id}`, updatedBlog);
            const updatedBlogs = blogs.map(blog => (blog.id === updatedBlog.id ? response.data : blog));
            setBlogs(updatedBlogs);
            setEditBlog(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddBlog = async (newBlog) => {
        try {
            const response = await axios.post('https://667f687ff2cb59c38dc8cee6.mockapi.io/api/v1/Blog', newBlog);
            setBlogs([...blogs, response.data]);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <Button variant="success" onClick={() => setShowModal(true)}>
                Add New
            </Button>

            <AddBlog
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleAddBlog={handleAddBlog}
            />

            {selectedBlog && (
                <BlogPersonal
                    show={!!selectedBlog}
                    handleClose={handleCloseView}
                    blog={selectedBlog}
                />
            )}

            {editBlog && (
                <UpdateBlog
                    show={!!editBlog}
                    handleClose={handleCloseEdit}
                    blog={editBlog}
                    handleUpdate={handleUpdateBlog}
                />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td>{blog.title}</td>
                            <td>
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} style={{ width: '100px' }} />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>
                                <Button
                                    variant="info"
                                    onClick={() => handleViewBlog(blog)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEditBlog(blog)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteBlog(blog.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminBlog;
