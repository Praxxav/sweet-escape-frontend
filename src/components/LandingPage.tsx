import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-800 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300/50 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-2xl">
        <Sparkles className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          Welcome to The Sweet Escape
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-prose">
          Discover a world of handcrafted sweets, from classic chocolates to modern confections. Every bite is a journey of flavor, made with love and the finest ingredients. Join us and treat yourself to a little piece of happiness.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link to="/signin">
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
              Sign In & Explore
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background/50 backdrop-blur-sm">
              Create an Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}