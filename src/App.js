import React, { useState, useContext, createContext } from "react"

const Context = createContext()

function AppProvider(props) {

  const [posts, setPosts] = useState([
    { id: 1, title: "post1" },
    { id: 2, title: "post2" },
    { id: 3, title: "post3" },
    { id: 4, title: "post4" },
    { id: 5, title: "post5" },
  ])

  return (
    <Context.Provider value={[posts, setPosts]}>
      {props.children}
    </Context.Provider>
  )
}

function AddPost({ onAdd }) {

  const [value, setValue] = useState("")

  return (
    <div className="row justify-content-center ">
      <div className="col-2 border">
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
      </div>
      <div className="col-2">
        <button onClick={(e) => onAdd(value)}>Add</button>
      </div>

    </div>


  )
}

function Post({ post, index, onDelete }) {

  return (
    <div className="row justify-content-center ">
      <div className="col-2 border">
        {post.title}
      </div>
      <div className="col-2">
        <button onClick={(e) => onDelete(post)}>Delete</button>
      </div>

    </div>
  )
}

function Blogger() {
  // const [posts, setPosts] = useState([
  //     { id: 1, title: "post1" },
  //     { id: 2, title: "post2" },
  //     { id: 3, title: "post3" },
  //     { id: 4, title: "post4" },
  //     { id: 5, title: "post5" },
  // ])

  const [posts, setPosts] = useContext(Context)

  function onDelete(post) {
    let tempPosts = [...posts]
    tempPosts = tempPosts.filter(x => x.id !== post.id)
    setPosts(tempPosts)
  }

  function onAdd(title) {
    let maxId = Math.max.apply(Math, posts.map(x => x.id)) + 1
    console.log(maxId)

    let tempPosts = [...posts, { id: maxId, title: title }]
    setPosts(tempPosts)
  }


  return (
    <div className="container" style={{ border: "1px solid black" }}>
      <div className="row justify-content-center bg-dark" >
        <div className="col-4 text-center  text-white">
          A cool blog in react!
            </div>
      </div>
      {
        posts.map(
          (post, index) => <Post post={post} key={index} onDelete={onDelete} />
        )
      }
      <AddPost onAdd={onAdd} />
    </div>

  )
}

function App() {
  return (
    <AppProvider>
      <Blogger />
    </AppProvider>
  )
}

export default App