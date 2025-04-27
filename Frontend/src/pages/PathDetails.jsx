import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import posts from "../Data/posts";

const PathDetails = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <div className="p-6 text-center text-lg">Post not found.</div>;

  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 lg:px-16">
      <div className="space-y-6">
        <div className="flex gap-2 items-center ">
          <Link to="/account" className="text-primary text-xl sm:text-2xl">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary underline">
            {post.title} Path
          </h1>
        </div>

        <p className="text-gray-600 text-base sm:text-lg">{post.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-h-[600px]">
          <div className="w-full h-full max-h-[600px] flex justify-center items-center">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-contain rounded"
            />
          </div>
          <div
            className={`grid gap-3 ${
              post.videos.length === 1
                ? "grid-cols-1"
                : post.videos.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {post.videos.map((video, index) => (
              <iframe
                key={index}
                className={`w-full ${
                  post.videos.length === 1
                    ? "h-[300px]"
                    : post.videos.length === 2
                    ? "h-[200px]"
                    : "h-[160px]"
                } rounded-lg`}
                src={video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
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
