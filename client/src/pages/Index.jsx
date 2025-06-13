import BlogCard from "@/components/BlogCart";
import Loading from "@/components/Loading";
import { getEvn } from "@/helpers/getEnv";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${getEvn("VITE_API_BASE_URL")}/blog/blogs`,
          {
            withCredentials: true,
          }
        );
        setBlogData(response.data.blog);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {blogData && blogData.length > 0 ? (
        blogData.map((blog) => <BlogCard key={blog._id} props={blog} />)
      ) : (
        <div>Data Not Found.</div>
      )}
    </div>
  );
};

export default Index;
