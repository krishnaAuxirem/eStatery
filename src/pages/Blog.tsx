import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, Eye, ArrowRight, Tag, TrendingUp, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOGS, BLOG_CATEGORIES } from "@/data/blogs";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = BLOGS.filter(b => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = !selectedTag || b.tags.includes(selectedTag);
    return matchCat && matchSearch && matchTag && b.published;
  });

  const featured = filtered.find(b => b.featured);
  const recentArticles = BLOGS.filter(b => b.published && b.id !== featured?.id).slice(0, 4);

  // Extract all tags
  const allTags = Array.from(new Set(BLOGS.flatMap(b => b.tags)));

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">AI Real Estate Intelligence Hub</h1>
          <p className="text-white/70 mb-8">Expert analysis, market trends, and data-driven investment insights.</p>
          <div className="flex items-center gap-3 max-w-md mx-auto bg-white rounded-2xl px-4 py-3 shadow-brand">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search articles by title or content..." 
              className="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400" 
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          <button 
            onClick={() => { setActiveCategory("All"); setSelectedTag(null); }} 
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border",
              activeCategory === "All" && !selectedTag
                ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
            )}
          >
            All Articles
          </button>
          {BLOG_CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => { setActiveCategory(cat); setSelectedTag(null); }} 
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border",
                activeCategory === cat 
                  ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Articles (Main Content) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tag indicator if active */}
            {selectedTag && (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <span className="text-sm font-semibold text-[#1D4ED8] flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Filtered by Tag: <span className="underline">#{selectedTag}</span>
                </span>
                <button onClick={() => setSelectedTag(null)} className="text-xs text-[#1D4ED8] font-bold hover:underline">
                  Clear Filter
                </button>
              </div>
            )}

            {/* Featured Article */}
            {featured && !selectedTag && (
              <Link to={`/blog/${featured.slug}`} className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-56 md:h-auto overflow-hidden bg-slate-50">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#1D4ED8] text-white text-[10px] font-bold tracking-wide rounded-lg uppercase">FEATURED ARTICLE</span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wide mb-2">{featured.category}</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug mb-3 group-hover:text-[#1D4ED8] transition-colors line-clamp-3">{featured.title}</h2>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mt-auto border-t border-slate-100 pt-4">
                      <span className="font-semibold text-slate-600">{featured.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} min read</span>
                      <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {featured.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of Other Articles */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-2">No Articles Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">Try adjusting your filters, selecting a different category, or resetting your search search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map(blog => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col h-full">
                    <div className="relative h-44 overflow-hidden bg-slate-50">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wide">{blog.category}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-slate-400 text-[10px] font-semibold mb-2 uppercase">
                        <span>{blog.author}</span><span>·</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min</span>
                      </div>
                      <h3 className="font-bold text-slate-800 leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2 mb-2">{blog.title}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">{blog.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md">#{tag}</span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] border-t border-slate-100 pt-3 mt-1">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Trending/Recent Articles */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-3 border-b border-slate-100">
                <TrendingUp className="w-4 h-4 text-[#1D4ED8]" /> Recent Stories
              </h3>
              <div className="space-y-4">
                {recentArticles.map(art => (
                  <Link key={art.id} to={`/blog/${art.slug}`} className="flex gap-3 items-start group">
                    <img src={art.image} alt={art.title} className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-50" />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-700 text-xs leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2">{art.title}</h4>
                      <p className="text-slate-400 text-[10px] mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(art.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags cloud */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                <Tag className="w-4 h-4 text-[#1D4ED8]" /> Popular Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setActiveCategory("All"); }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                      selectedTag === tag
                        ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100 hover:text-slate-800"
                    )}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
