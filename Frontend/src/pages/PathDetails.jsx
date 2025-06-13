import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import posts from "../Data/posts";

const API_BASE_URL = "/api";

const PathDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/career-paths`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-store",
            Pragma: "no-cache",
          },
          cache: "no-store",
        });

        if (response.status === 304) {
          throw new Error("No updated data available (304)");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch career path");
        }

        const data = await response.json();
        const foundPost = data.find((p) => p.id === parseInt(id));

        if (!foundPost) {
          throw new Error("Career path not found");
        }

        const matchingImagePost = posts.find((p) => p.id === parseInt(id));
        if (matchingImagePost) {
          foundPost.image = matchingImagePost.image;
        }

        setPost(foundPost);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">Post not found.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 pb-8 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 border-b pb-4">
            <Link
              to="/account"
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-2xl cursor-pointer" />
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {post.title} Path
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">{post.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="max-h-[600px]">
              <img src={post.image} alt={post.title} className="w-full h-full object-contain" />
            </div>

            {/* Videos Container */}
            <div className="grid grid-cols-1 gap-4">
              {post.videos.map((video, index) => (
                <div key={index} className="relative w-full aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-xl">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-500">Offered By</span>
              <span className="text-gray-900 font-semibold">{post.offeredBy}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-500">Category</span>
              <span className="text-gray-900 font-semibold">{post.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathDetails;
