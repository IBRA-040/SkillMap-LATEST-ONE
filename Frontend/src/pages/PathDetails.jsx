import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import posts from "../Data/posts";

const PathDetails = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <div className="p-10 text-center text-xl">Post not found.</div>;

  return (
    <div className="min-h-screen">
      <div className="mx-10 p-6 space-y-6 ">
        <div className="flex gap-3 items-center ">
          <Link to="/account" className=" text-primary text-2xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="text-3xl font-bold text-primary underline">{post.title} Path</h1>
        </div>

        <div className="text-gray-600 text-lg">{post.description}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-gray-700">
          <div>
            <span className="font-semibold">Offered By:</span> {post.offeredBy}
          </div>
          <div>
            <span className="font-semibold">Category:</span> {post.category}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {post.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathDetails;
