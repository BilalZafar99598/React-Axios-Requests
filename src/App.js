import Header from "./Header"
import Nav from "./Nav"
import Home from "./Home"
import NewPost from "./NewPost"
import PostPage from "./PostPage"
import Missing from "./Missing"
import About from "./About"
import Footer from "./Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';

const App = () => {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:22:22 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores a. Dignissimos accusantium quas similique!"
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "July 02, 2021 11:22:22 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores a. Dignissimos accusantium quas similique!"
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "July 03, 2021 11:22:22 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores a. Dignissimos accusantium quas similique!"
    },
    {
      id: 4,
      title: "My Forth Post",
      datetime: "July 04, 2021 11:22:22 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores a. Dignissimos accusantium quas similique!"
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1: 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const newPost = {
        id: id,
        title: postTitle,
        datetime,  
        body: postBody,
      }
      const allPosts = [...posts, newPost]
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');

  }

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate('/');
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
      </Routes>
      {/* </Router> */}
      <Footer />
    </div>
  )
}

export default App