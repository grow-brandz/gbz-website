import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';

import Header from "./components/header.jsx"
import Footer from "./components/footer.jsx"

import Home from "./pages/home.jsx"
import About from "./pages/about.jsx"
import Contact from "./pages/contact.jsx"
import OurApproach from "./pages/our-approach.jsx"
import OurProcess from "./pages/our-process.jsx"
import Services from "./pages/services.jsx"
import Blog from "./pages/blog.jsx"
import BlogPost from "./pages/blog-post.jsx"
import ScrollReset from './components/ScrollReset.jsx';
import Loader from './components/loader.jsx';
import CommonHeroAnimation from './components/CommonHeroAnimation.jsx';
import Thanks from './components/thanks.jsx';
import NotFound from './components/404.jsx';

function App() {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const l = new Lenis({
      smooth: true,
      duration: 1.5,
    });

    setLenis(l);

    function raf(time) {
      l.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


  }, []);


  return (
    <BrowserRouter>
      <ScrollReset lenis={lenis} />
       <CommonHeroAnimation />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-approach" element={<OurApproach />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thankyou" element={<Thanks />} />

        {/* Blogs */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
