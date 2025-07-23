import { useState } from 'react';
import '../styles/Blog.css';

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "Why Playing Trivia Games Makes You Smarter",
      date: "June 6, 2025",
      author: "Agnik Misra",
      category: "Education",
      readTime: "3 min read",
      excerpt: "Discover how trivia games can boost your cognitive function, improve memory, and enhance decision-making skills.",
      content: "Trivia quizzes are more than just fun – they challenge your memory and boost brain power. Regularly playing trivia helps improve cognitive function, memory retention, and even decision-making skills. Whether it's sports, science, or history, testing your knowledge keeps your mind active! Studies show that engaging in regular mental challenges can help prevent cognitive decline and improve overall brain health.",
      image: "/assets/images/blog/blogimage1.jpeg",
      tags: ["Brain Health", "Learning", "Cognitive Science"]
    },
    {
      id: 2,
      title: "Top 5 Trivia Categories You Should Try Today",
      date: "June 6, 2025",
      author: "Agnik Misra",
      category: "Gaming",
      readTime: "4 min read",
      excerpt: "Explore the most engaging trivia categories that will test your knowledge and keep you entertained.",
      content: "Bored of the same old questions? Try these popular categories:\n\n1. **General Knowledge** – A bit of everything!\n2. **Science & Nature** – Test your inner nerd.\n3. **Movies & TV Shows** – Perfect for binge-watchers.\n4. **Sports** – For the true fans.\n5. **History** – Learn while you play.\n\nTrivia lets you explore topics you love while learning something new every day! Each category offers unique challenges and learning opportunities.",
      image: "/assets/images/blog/blogimage2.jpeg",
      tags: ["Categories", "Gaming", "Entertainment"]
    },
    {
      id: 3,
      title: "How Our Quiz Timer Makes the Game More Exciting",
      date: "June 6, 2025",
      author: "Agnik Misra",
      category: "Features",
      readTime: "2 min read",
      excerpt: "Learn how time pressure enhances the quiz experience and improves your quick thinking abilities.",
      content: "Our built-in timer gives you 30 seconds to answer each question — just enough to think, but not enough to Google! It adds pressure, improves quick thinking, and makes the game feel like a real challenge. The timer feature is designed to simulate real-world decision-making scenarios where quick thinking is essential.",
      image: "/assets/images/blog/blogimage3.jpeg",
      tags: ["Timer", "Features", "Game Design"]
    },
    {
      id: 4,
      title: "Trivia Around the World: Fun Facts You Didn't Know",
      date: "June 6, 2025",
      author: "Agnik Misra",
      category: "Culture",
      readTime: "5 min read",
      excerpt: "Discover fascinating trivia traditions and facts from different cultures around the globe.",
      content: "Did you know?\n\n• The longest trivia game lasted over 30 hours!\n• In Japan, trivia shows are part of national culture.\n• In the US, bar trivia nights are a weekly tradition.\n• Ancient Greeks used trivia as educational tools.\n\nPlay globally, learn globally! Trivia has been a universal form of entertainment and education across cultures for centuries.",
      image: "/assets/images/blog/blogimage4.jpeg",
      tags: ["Culture", "Facts", "Global"]
    }
  ];

  const categories = ['all', 'Education', 'Gaming', 'Features', 'Culture'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="hero-content">
          <h1>Trivia Insights & Updates</h1>
          <p>Discover the latest trends, tips, and fascinating stories from the world of trivia</p>
        </div>
      </section>

      <div className="blog-container">
        {/* Search and Filter Section */}
        <div className="blog-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="featured-post">
            <div className="featured-image">
              <img src={filteredPosts[0].image} alt={filteredPosts[0].title} />
              <div className="featured-overlay">
                <span className="featured-badge">Featured</span>
              </div>
            </div>
            <div className="featured-content">
              <div className="post-meta">
                <span className="category-tag">{filteredPosts[0].category}</span>
                <span className="read-time">{filteredPosts[0].readTime}</span>
              </div>
              <h2>{filteredPosts[0].title}</h2>
              <p className="excerpt">{filteredPosts[0].excerpt}</p>
              <div className="post-footer">
                <div className="author-info">
                  <span className="author">By {filteredPosts[0].author}</span>
                  <span className="date">{filteredPosts[0].date}</span>
                </div>
                <button className="read-more-btn">Read Article</button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="blog-posts-section">
          <h2>Latest Articles</h2>
          <div className="blog-posts-grid">
            {filteredPosts.slice(1).map(post => (
              <article key={post.id} className="blog-post-card">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-overlay">
                    <span className="category-badge">{post.category}</span>
                  </div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="read-time">{post.readTime}</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="excerpt">{post.excerpt}</p>
                  <div className="tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="post-footer">
                    <span className="author">By {post.author}</span>
                    <button className="read-more">Read More →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Get the latest trivia tips and updates delivered to your inbox</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
