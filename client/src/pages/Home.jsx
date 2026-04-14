import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const fetchPosts = async ({ queryKey }) => {
  const [_key, { category, search }] = queryKey;
  const params = { limit: 20 };
  
  if (category !== 'All') params.category = category;
  if (search) params.search = search;
  
  const { data } = await api.get('/posts', { params });
  return data;
};

const CATEGORIES = ["All", "Technology", "Startup", "Lifestyle", "Finance"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', { category: activeCategory, search: searchQuery }],
    queryFn: fetchPosts,
  });

  return (
    <div className="flex flex-col items-center bg-neutral">
      {/* Hero Section */}
      <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-primary-50 to-neutral">
        <div className="text-center w-full max-w-4xl px-4 mx-auto flex flex-col items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-600 font-medium text-sm font-label mb-6 border border-primary-200 cursor-pointer hover:bg-primary-200 smooth-hover">
              <Sparkles className="h-4 w-4" />
              New: AI feature integrated
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Your own <span className="text-primary-500">blogging</span> platform.
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
              This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
            </p>

            {/* Search Bar */}
            <div className="flex w-full max-w-2xl mx-auto bg-white rounded-full border-2 border-gray-200 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary-400 smooth-hover">
              <input 
                type="text" 
                placeholder="Search for blogs" 
                className="flex-1 bg-transparent px-6 py-3 outline-none text-gray-700 placeholder:text-gray-400 font-label"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn-primary">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-label font-medium smooth-hover ${
                activeCategory === category 
                  ? "btn-primary" 
                  : "btn-outlined"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse flex flex-col space-y-4">
                <div className="h-56 bg-gray-200 rounded-2xl w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-50 p-8 rounded-2xl border border-red-200 font-label">
            Failed to load posts. Please try again later.
          </div>
        ) : data?.posts?.length === 0 ? (
          <div className="text-center text-gray-600 p-12 bg-primary-50 rounded-2xl font-label">
            No posts found. Be the first to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.posts?.map((post, i) => (
              <motion.article 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col cursor-pointer card-default overflow-hidden hover:shadow-lg smooth-hover"
              >
                {post.coverImage ? (
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 smooth-hover"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-primary-100 flex items-center justify-center text-primary-400">
                    <span className="opacity-60 font-medium font-label">No Image</span>
                  </div>
                )}
                
                <div className="flex-1 flex flex-col p-5">
                  <Link to={`/post/${post.slug}`} className="block group-hover:text-primary-600 smooth-hover">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight font-headline">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed mb-4 font-body">
                    {post.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
