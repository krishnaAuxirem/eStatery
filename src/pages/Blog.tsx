import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock, Eye, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOGS, BLOG_CATEGORIES } from "@/data/blogs";
import { cn } from "@/lib/utils";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = BLOGS.filter(b => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && b.published;
  });

  const featured = filtered.find(b => b.featured);
  const rest = filtered.filter(b => !b.featured || filtered.indexOf(b) !== filtered.findIndex(x => x.featured));

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        <div className="bg-gradient-to-r from-[#1a0845] to-[#0d0630] py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">AI Real Estate Intelligence Hub</h1>
            <p className="text-white/70 mb-8">Expert analysis, market trends, and data-driven investment insights.</p>
            <div className="flex items-center gap-3 max-w-md mx-auto bg-white rounded-2xl px-4 py-3 shadow-brand">
              <Search className="w-4 h-4 text-brand-muted" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="flex-1 outline-none text-sm text-brand-text placeholder-brand-muted" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
            {BLOG_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border", activeCategory === cat ? "bg-brand-purple text-white border-brand-purple" : "bg-white text-brand-muted border-brand-border hover:border-brand-purple hover:text-brand-purple")}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group block bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-xl bg-brand-purple text-white text-xs font-bold">FEATURED</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-brand-purple uppercase tracking-wide mb-3">{featured.category}</span>
                  <h2 className="text-2xl font-bold text-brand-text leading-snug mb-3 group-hover:text-brand-purple transition-colors">{featured.title}</h2>
                  <p className="text-brand-muted leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-brand-muted">
                    <span>{featured.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime} min</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {featured.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-5 text-brand-purple font-semibold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.filter(b => b.published && (activeCategory === "All" || b.category === activeCategory) && (!search || b.title.toLowerCase().includes(search.toLowerCase()))).map(blog => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="group bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-purple/90 backdrop-blur-sm text-white text-xs font-semibold">{blog.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-brand-muted text-xs mb-2">
                    <span>{blog.author}</span><span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views.toLocaleString()}</span>
                  </div>
                  <h3 className="font-bold text-brand-text leading-snug group-hover:text-brand-purple transition-colors line-clamp-2 mb-2">{blog.title}</h3>
                  <p className="text-brand-muted text-sm line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
