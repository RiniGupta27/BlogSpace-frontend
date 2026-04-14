import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            About <span className="text-primary-600">BlogSpace</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We built BlogSpace because we believe everyone has a story worth telling. Our mission is to provide a clean, distraction-free environment for ideas to flourish.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-sm h-80 w-full mb-12">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
            alt="Team collaborating" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg prose-primary max-w-none text-gray-700 leading-relaxed">
          <h3>Our Vision</h3>
          <p>
            In a world cluttered with noisy social media feeds and algorithmic echo chambers, finding a quiet corner to read and write deeply has become a luxury. We envisioned a platform that strips away the superficial metrics and focuses entirely on the quality of the written word.
          </p>

          <h3>What We Stand For</h3>
          <ul>
            <li><strong>Minimalism:</strong> Design should invisible, putting your content front and center.</li>
            <li><strong>Community:</strong> Engaging thoughtfully with fellow writers and thinkers globally.</li>
            <li><strong>Quality:</strong> Providing the best typography, reading experiences, and performance out of the box.</li>
          </ul>

          <p>
            Whether you are documenting your journey as a startup founder, sharing snippets of code, or just chronicling your daily lifestyle, BlogSpace provides the canvas. Connect with us on social media or reach out via our support channels if you're interested in joining our journey.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
