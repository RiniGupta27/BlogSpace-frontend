import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { PlusCircle, Settings, FileText, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import api from '../lib/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['my-posts'],
    queryFn: async () => {
      const { data } = await api.get('/posts/me');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      await api.delete(`/posts/id/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md shadow-primary-200">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-primary-600">{user?.name?.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome, {user?.name}</h1>
              <p className="text-gray-500 font-medium">{user?.email} | {user?.role}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link to="/home/create-post" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 shadow-md shadow-primary-200">
              <PlusCircle className="h-5 w-5" /> Write Story
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <FileText className="h-5 w-5" /> Total Posts
          </div>
          <div className="text-4xl font-extrabold text-gray-900">{data?.total || 0}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 mb-2">
            <Settings className="h-5 w-5" /> Account Status
          </div>
          <div className="text-xl font-bold text-green-600 mt-2">Active</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Your Stories
          <span className="text-sm font-normal text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{data?.posts?.length || 0}</span>
        </h2>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((n) => <div key={n} className="h-20 bg-gray-50 rounded-2xl"></div>)}
          </div>
        ) : data?.posts?.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 mb-4 font-medium">You haven&apos;t shared any stories yet.</p>
            <Link to="/home/create-post" className="text-primary-600 font-bold hover:text-primary-700">Write your first post &rarr;</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.posts?.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-transparent hover:border-primary-100"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0 px-2">
                  <div className="h-12 w-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                    <img src={post.coverImage || '/placeholder.png'} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="truncate">
                    <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/home/post/${post.slug}`}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    title="View post"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                  <Link
                    to={`/home/edit-post/${post._id}`}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Edit post"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete post"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
