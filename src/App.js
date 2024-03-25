import Header from "./Header"
import Nav from "./Nav"
import Home from "./Home"
import NewPost from "./NewPost"
import PostPage from "./PostPage"
import Missing from "./Missing"
import About from "./About"
import Footer from "./Footer"
import EditPost from "./EditPost"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';
import api from './api/posts';

const App = () => {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    const filterResult = posts.filter(post => 
      ((post.body).toLowerCase().includes(search.toLowerCase())
      || ((post.title).toLowerCase().includes(search.toLowerCase()))));
      setSearchResult(filterResult.reverse()); 
  }, [posts, search])

  return (
    <div>
      <Header title='ReactJS Blog App' />
      <Nav search={search} setSearch={setSearch} />
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home posts={searchResult} />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/post" element={<PostPage/>}/> */}
        <Route path="/*" element={<Missing />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/post" element={
          <>
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          </>
        } />
        <Route path="/edit/:id" element={
           <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        }
            
         />
      </Routes>
      {/* </Router> */}
      <Footer />
    </div>
  )
}

export default App