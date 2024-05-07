import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "./store";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "./Loading";
import { FaCircleUser } from "react-icons/fa6";

function UserWithPost() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const postId = location.pathname.split("/")[2];
  const [comments, setComments] = useState([]);
  const userId = params.get("userId");
  const dispatch = useDispatch();
  let post, user;

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());

    async function getComments() {
      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await resp.json();
      setComments(data);
    }

    getComments();
  }, [dispatch, postId]);

  const { posts, users } = useSelector((state) => ({
    posts: state.posts.posts,
    users: state.users.users,
  }));

  if (posts && users) {
    post = posts.find((post) => post.id === Number(postId));
    user = users.find((user) => user.id === Number(userId));
  }

  return (
    <>
      {post && user && comments.length > 0 ? (
        <div className="w-[50rem] m-auto p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-full">
          <div className="flex flex-col gap-2 text-xl p-2">
            <div>
              <p className="text-blue-500 flex items-center gap-2 text-xl">
                <FaCircleUser />
                {user.name}
              </p>
            </div>
            <div>{post.title}</div>
            <div>{post.body}</div>
          </div>
          <p className="py-4 text-xl">Comments</p>
          <textarea
            id="comment"
            rows="6"
            class="w-full rounded text-sm text-gray-900 focus:ring-0 focus:outline-none border border-gray-400 p-4 mb-4"
            placeholder="Write a comment..."
            required
          ></textarea>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className="pb-4">
                <p>
                  <p className="text-blue-500 flex items-center gap-2 text-xl">
                    <FaCircleUser />
                    {comment.name}
                  </p>
                </p>
                <p className="text-lg">{comment.body}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export default UserWithPost;
