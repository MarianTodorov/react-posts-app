import './App.css'
import {useEffect} from "react";
import PostCard from "./component/PostCard.tsx"
import {getPosts} from "./services/services.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store/store.ts";
import {getPost} from "./store/reducer.ts";
import DropdownButton from "./component/DropdownButton.tsx";
import NewPost from "./component/NewPost.tsx";
import type {Posts} from "./interface/Posts.ts";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const lastTwentyPosts = useSelector((state: RootState) => state.posts.lastTwentyPosts);
  const sortPost = useSelector((state: RootState) => state.posts.filterByUserID);
  const status = useSelector((state: RootState) => state.posts.status);
  const posts:Posts[] = status == "loadView" ? lastTwentyPosts : sortPost;
  useEffect(() => {
    async function load() {
      const data = await getPosts();
      dispatch(getPost(data));
    }
    load();
  }, [dispatch]);

  return (
      <>
        <header>
          <DropdownButton/>
          <NewPost/>
        </header>
        <main className="container my-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {posts.map((item: Posts) => (
                <div className="col" key={item.id+item.title.slice(0,3)+item.userId}>
                  <PostCard
                      userId={item.userId}
                      id={item.id}
                      title={item.title}
                      body={item.body}
                  />
                </div>
            ))}
          </div>
        </main>
        <footer></footer>
      </>
  )
}

export default App
