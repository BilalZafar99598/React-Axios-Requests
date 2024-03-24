const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) => {
    return (
      <main className="NewPost">
        <h3>New Post</h3>
        <form className="newPostForm" onSubmit={handleSubmit}>    
          <label htmlFor="postTitle">Post Title</label>
          <input
           type="text"
           required
           id="postTitle"
           value={postTitle}
           onChange={(e) => setPostTitle(e.target.value)}
          />        
          <label htmlFor="postBody">Post Body</label>
          <textarea
           type="text"
           required
           id="postBody"
           value={postBody}
           onChange={(e) => setPostBody(e.target.value)}
          />        
          <button type="submit" >Submit</button>
        </form>
      </main>
    )
  }
  
  export default NewPost