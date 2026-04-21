import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../lib/axios';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post-edit', id],
    queryFn: async () => {
      const { data } = await api.get(`/posts/id/${id}`);
      return data;
    },
  });

  const resolvedFormData = {
    title: formData.title ?? post?.title ?? '',
    content: formData.content ?? post?.content ?? '',
    category: formData.category ?? post?.category ?? 'Technology',
    coverImage: formData.coverImage ?? post?.coverImage ?? '',
    status: formData.status ?? post?.status ?? 'published',
  };

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      await api.put(`/posts/id/${id}`, updatedData);
    },
    onSuccess: () => {
      navigate('/home/dashboard');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(resolvedFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div className="text-center py-20 animate-pulse text-gray-400">Loading story details...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading post.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Your Story</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
            <input
              name="title"
              type="text"
              required
              className="w-full text-2xl font-bold px-4 py-3 border-b-2 border-transparent hover:border-gray-200 focus:border-primary-500 outline-none transition-colors"
              value={resolvedFormData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none font-medium"
                value={resolvedFormData.category}
                onChange={handleChange}
              >
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
              <input
                name="coverImage"
                type="url"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none font-medium"
                value={resolvedFormData.coverImage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              required
              rows={12}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 focus:ring-2 focus:ring-primary-500 outline-none leading-relaxed"
              value={resolvedFormData.content}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-full font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-primary-200 flex items-center gap-2 disabled:opacity-70"
            >
              <Save className="h-5 w-5" />
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
