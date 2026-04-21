import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import api from '../lib/axios';

export default function PostDetail() {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${slug}`);
      return data;
    },
  });

  if (isLoading) return <div className="text-center py-20 text-gray-500 animate-pulse">Loading story...</div>;
  if (error || !post) return <div className="text-center py-20 text-red-500">Post not found.</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/home" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Discoveries
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-primary-600 uppercase tracking-widest">
          {post.category}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-10 pb-8 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {post.author?.avatar ? (
              <img src={post.author.avatar} alt="author" className="h-10 w-10 rounded-full" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"><User className="h-5 w-5 text-gray-400" /></div>
            )}
            <span className="font-semibold text-gray-900">{post.author?.name}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {post.coverImage && (
          <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-3xl overflow-hidden mb-12 shadow-sm">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div
          className="prose prose-lg prose-primary max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </article>
  );
}
