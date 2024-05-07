import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, fetchUsers } from "./store";
import { FaCircleUser } from "react-icons/fa6";

import LoadingSpinner from "./Loading";

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      {users && posts ? (
        <div className="container shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-auto">
          {users.map((user) => {
            return (
              <>
                <div
                  key={user.id}
                  className="flex flex-wrap content-center gap-4 p-4 border-b border-gray-500"
                >
                  {posts.map((post) => {
                    return (
                      user.id === post.userId && (
                        <a
                          key={post.id}
                          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[25rem] p-4 rounded"
                          style={{ display: "block" }}
                          href={`/post/${post.id}?userId=${user.id}`}
                        >
                          <p className="text-blue-500 flex items-center gap-2 text-xl">
                            <FaCircleUser />
                            {user.name}
                          </p>
                          <p className="text-lg font-medium">{post.title}</p>
                          <p>{post.body}</p>
                        </a>
                      )
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default Home;
