import { useState, useEffect } from "react";
import PostCard from "../card/PathCard";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [careerPaths, setCareerPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const response = await fetch('/api/career-paths', {
          headers: {
            ...getAuthHeader(),
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch career paths');
        }
        
        const data = await response.json();
        setCareerPaths(data);
      } catch (err) {
        console.error('Error fetching career paths:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerPaths();
  }, [getAuthHeader]);

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const categorizedPosts = careerPaths.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading career paths...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-10 sm:px-6 md:px-10">
      {Object.entries(categorizedPosts).map(([category, postsInCategory]) => {
        const isCollapsed = collapsedCategories[category];
        return (
          <section key={category} className="mb-12 pb-6 last:border-none last:pb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">
                {category} ({postsInCategory.length})
              </h2>
              <IconButton onClick={() => toggleCategory(category)}>
                {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden transition-all duration-300  
                ${isCollapsed ? "max-h-0" : "max-h-[1000px] mt-4 sm:mt-6"}`}
            >
              {postsInCategory.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Dashboard;
