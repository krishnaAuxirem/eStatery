import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { BLOGS } from "@/data/blogs";
import { toast } from "sonner";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState(BLOGS);
  const [blogForm, setBlogForm] = useState({ title: "", category: "Investment Guide", excerpt: "" });

  const togglePublish = (id: string) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b))
    );
    toast.success("Blog status updated!");
  };

  const createDraft = () => {
    if (!blogForm.title) {
      toast.error("Please enter a title");
      return;
    }
    const newBlog = {
      id: blogs.length + 1,
      title: blogForm.title,
      category: blogForm.category,
      excerpt: blogForm.excerpt,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
      author: "Super Admin",
      views: 0,
      published: false,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      readTime: "3 min read",
      slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      content: blogForm.excerpt
    };
    setBlogs((prev) => [newBlog, ...prev]);
    toast.success("Blog draft created!");
    setBlogForm({ title: "", category: "Investment Guide", excerpt: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <h3 className="font-bold text-[#0F172A] text-lg mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-red-500" /> Create New Blog Post
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Blog Title</label>
            <input
              type="text"
              value={blogForm.title}
              onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Enter a compelling title..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Category</label>
            <select
              value={blogForm.category}
              onChange={(e) => setBlogForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition-all"
            >
              {[
                "AI & Technology",
                "Investment Guide",
                "Smart Living",
                "Buyer's Guide",
                "Commercial",
                "Rental Market",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Excerpt</label>
            <textarea
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm((p) => ({ ...p, excerpt: e.target.value }))}
              rows={3}
              placeholder="Write a brief summary..."
              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 resize-none transition-all"
            />
          </div>
        </div>
        <button
          onClick={createDraft}
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm hover:shadow-lg transition-all"
        >
          Create Draft
        </button>
      </div>
      <div>
        <h3 className="font-bold text-[#0F172A] text-lg mb-4">
          All Blog Posts <span className="text-[#64748B] font-normal text-base">({blogs.length})</span>
        </h3>
        <div className="space-y-3">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <img src={b.image} alt={b.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-[#0F172A] truncate">{b.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium">
                    {b.category}
                  </span>
                  <span className="text-[#64748B] text-xs">{b.author}</span>
                  <span className="text-[#64748B] text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {b.views.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => togglePublish(b.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  b.published
                    ? "bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-700"
                    : "bg-amber-50 text-amber-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {b.published ? "Published" : "Draft"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
