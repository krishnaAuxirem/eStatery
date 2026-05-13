import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Eye, Calendar, Tag, Share2, Twitter, Linkedin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOGS } from "@/data/blogs";
import { toast } from "sonner";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = BLOGS.find(b => b.slug === slug);
  const related = BLOGS.filter(b => b.id !== blog?.id && b.category === blog?.category).slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-brand-text mb-2">Article Not Found</h2>
            <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-brand-purple hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const contentParagraphs = blog.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="relative h-72 lg:h-96 overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
            <span className="inline-block px-3 py-1.5 rounded-xl bg-brand-purple text-white text-xs font-bold mb-3">{blog.category}</span>
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">{blog.title}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted mb-8 pb-6 border-b border-brand-border">
            <span className="font-medium text-brand-text">{blog.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blog.readTime} min read</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.views.toLocaleString()} views</span>
            <div className="ml-auto flex gap-2">
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }} className="p-2 rounded-lg border border-brand-border hover:border-brand-purple text-brand-muted hover:text-brand-purple transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <p className="text-lg text-brand-muted leading-relaxed mb-6 font-medium">{blog.excerpt}</p>
            {contentParagraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return <h3 key={i} className="text-xl font-bold text-brand-text mt-8 mb-3">{para.replace(/\*\*/g, "")}</h3>;
              }
              return <p key={i} className="text-brand-text leading-relaxed mb-4">{para}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-brand-border">
            <span className="flex items-center gap-1 text-brand-muted text-sm"><Tag className="w-3.5 h-3.5" /> Tags:</span>
            {blog.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-purple-50 text-brand-purple text-xs font-medium">{tag}</span>
            ))}
          </div>

          {/* Back */}
          <div className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-brand-purple font-semibold hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-brand-text mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map(r => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all">
                    <div className="h-32 overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-brand-purple font-semibold mb-1">{r.category}</p>
                      <h3 className="font-semibold text-brand-text text-sm leading-snug group-hover:text-brand-purple transition-colors line-clamp-2">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
