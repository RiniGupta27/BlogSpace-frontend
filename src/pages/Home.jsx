import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';

const fetchPosts = async ({ queryKey }) => {
  const [_key, { category, search }] = queryKey;
  const params = { limit: 20 };

  if (category !== 'All') params.category = category;
  if (search) params.search = search;

  const { data } = await api.get('/posts', { params });
  return data;
};

const CATEGORIES = ['All', 'Technology', 'Startup', 'Lifestyle', 'Finance'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', { category: activeCategory, search: searchQuery }],
    queryFn: fetchPosts,
  });

  return (
    <div className="flex flex-col items-center">
      <section className="text-center w-full max-w-4xl px-4 pt-16 pb-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-6 border border-primary-100 shadow-sm cursor-pointer hover:bg-primary-100 transition-colors">
            New: AI feature integrated <Sparkles className="h-4 w-4" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6">
            Your own <span className="text-primary-600">blogging</span> <br />
            platform.
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            This is your space to think out loud, to share what matters, and to write without filters. Whether it&apos;s one word or a thousand, your story starts right here.
          </p>

          <div className="flex w-full max-w-2xl mx-auto bg-white rounded-full border border-gray-200 p-1 shadow-sm focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-300 transition-all">
            <input
              type="text"
              placeholder="Search for blogs"
              className="flex-1 bg-transparent px-6 py-3 outline-none text-gray-700 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Search
            </button>
          </div>
        </motion.div>
      </section>

      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse flex flex-col space-y-4">
                <div className="h-56 bg-gray-200 rounded-3xl w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-8 rounded-2xl">
            Failed to load posts.
          </div>
        ) : data?.posts?.length === 0 ? (
          <div className="text-center text-gray-500 p-12">
            No posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.posts?.map((post, i) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col cursor-pointer"
              >
                {post.coverImage ? (
                  <div className="h-56 overflow-hidden rounded-3xl mb-4 relative shadow-sm">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4 flex items-center justify-center text-gray-400">
                    <span className="opacity-50 font-medium">No Image</span>
                  </div>
                )}

                <div className="flex-1 flex flex-col px-2">
                  <Link to={`/post/${post.slug}`} className="block group-hover:text-primary-600 transition-colors">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed mb-4">
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
