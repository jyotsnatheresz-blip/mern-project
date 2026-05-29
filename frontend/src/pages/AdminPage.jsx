import { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Chip, Avatar, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Delete, Edit, AdminPanelSettings, CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('blogs'); // 'blogs' or 'users'
  const [editDialog, setEditDialog] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const navigate = useNavigate();

  // Brown + Admin Colors
  const brownMain = '#8B5A2B';
  const brownDark = '#5D4037';
  const adminRed = '#C62828';
  const adminGreen = '#2E7D32';

  useEffect(() => {
    checkAdmin();
    fetchAllData();
  }, []);

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      alert('The Admin can only access here');
      navigate('/');
    }
  };

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const blogsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/admin/blogs`, config);
      setAllBlogs(blogsRes.data);
      
      
      const usersRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/admin/users', config);
      setAllUsers(usersRes.data);
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.status === 403) {
        alert('Are you Admin?');
        navigate('/');
      }
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Do you want to delete this blog for permanently')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/blogs/admin/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllBlogs(allBlogs.filter(blog => blog._id !== id));
        alert('Blog Deleted🗑️');
      } catch (error) {
        alert('Delete ചെയ്യാൻ പറ്റിയില്ല');
      }
    }
  };

  const handleEditClick = (blog) => {
    setEditBlog(blog);
    setEditDialog(true);
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/blogs/admin/blogs/${editBlog._id}`, editBlog, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditDialog(false);
      fetchAllData(); // Refresh
      alert('Blog Updated✅');
    } catch (error) {
      alert('Update failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Do you want to delete this,confirm?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/blogs/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllUsers(allUsers.filter(user => user._id !== id));
        alert('User Deleted');
      } catch (error) {
        alert('Cannot Delete');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: brownMain }} size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '90vh', background: '#F5F5F5', py: 4, px: { xs: 2, md: 4 } }}>
      {/* Admin Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 4,
        p: 3,
        background: `linear-gradient(135deg, ${brownDark}, ${adminRed})`,
        borderRadius: 3,
        color: 'white'
      }}>
        <AdminPanelSettings sx={{ fontSize: 50 }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Admin Control Panel
          </Typography>
          <Typography variant="body1">
            Full power to manage blogs & users
          </Typography>
        </Box>
      </Box>

      {/* Tab Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant={tab === 'blogs' ? 'contained' : 'outlined'}
          onClick={() => setTab('blogs')}
          sx={{
            background: tab === 'blogs' ? brownMain : 'transparent',
            color: tab === 'blogs' ? 'white' : brownMain,
            borderColor: brownMain,
            fontWeight: 700,
            px: 4
          }}
        >
          ALL BLOGS ({allBlogs.length})
        </Button>
        <Button
          variant={tab === 'users' ? 'contained' : 'outlined'}
          onClick={() => setTab('users')}
          sx={{
            background: tab === 'users' ? brownMain : 'transparent',
            color: tab === 'users' ? 'white' : brownMain,
            borderColor: brownMain,
            fontWeight: 700,
            px: 4
          }}
        >
          ALL USERS ({allUsers.length})
        </Button>
      </Box>

      {/* Blogs Table */}
      {tab === 'blogs' && (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ background: brownDark }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Author</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBlogs.map((blog) => (
                <TableRow key={blog._id} sx={{ '&:hover': { background: '#FAFAFA' } }}>
                  <TableCell sx={{ fontWeight: 600, maxWidth: 300 }}>{blog.title}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 30, height: 30, background: brownMain, fontSize: '0.9rem' }}>
                        {/* ✅ FIX 3: author → userId, name → username */}
                        {blog.userId?.name?.charAt(0) || 'U'}
                      </Avatar>
                      {/* ✅ FIX 4: author → userId, name → username */}
                      {blog.userId?.name || 'Deleted User'}
                      
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={blog.category} size="small" sx={{ background: brownMain, color: 'white' }} />
                  </TableCell>
                  <TableCell>{new Date(blog.createdAt).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleEditClick(blog)} sx={{ color: adminGreen }}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteBlog(blog._id)} sx={{ color: adminRed }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Users Table */}
      {tab === 'users' && (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ background: brownDark }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700 }}>Joined</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user._id} sx={{ '&:hover': { background: '#FAFAFA' } }}>
                  {/* ✅ FIX 5: user.name → user.username */}
                  <TableCell sx={{ fontWeight: 600 }}>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      color={user.role === 'admin' ? 'error' : 'default'}
                      icon={user.role === 'admin' ? <AdminPanelSettings /> : null}
                    />
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {user.role !== 'admin' && (
                      <IconButton onClick={() => handleDeleteUser(user._id)} sx={{ color: adminRed }}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Blog Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ background: brownDark, color: 'white', fontWeight: 700 }}>
          Edit Blog - Admin Power 🫦
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={editBlog?.title || ''}
            onChange={(e) => setEditBlog({...editBlog, title: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Category"
            value={editBlog?.category || ''}
            onChange={(e) => setEditBlog({...editBlog, category: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={8}
            value={editBlog?.content || ''}
            onChange={(e) => setEditBlog({...editBlog, content: e.target.value})}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setEditDialog(false)} startIcon={<Cancel />} sx={{ color: adminRed }}>
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" startIcon={<CheckCircle />} sx={{ background: adminGreen }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
