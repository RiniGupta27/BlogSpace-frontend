import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { PenTool, LogOut, User } from 'lucide-react';
import Logo from '../components/Logo';

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <header className="sticky top-0 z-50 py-4 backdrop-blur-sm bg-white/90 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo area */}
            <Link to="/home" className="hover:opacity-80 smooth-hover">
              <Logo />
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link to="/home/about" className="text-gray-600 font-label hover:text-primary-600 smooth-hover hidden sm:block">
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-label font-medium text-gray-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200">
                      <User className="h-4 w-4 text-primary-600" />
                      {user?.name}
                    </span>
                    <button 
                      onClick={logout}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full smooth-hover"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                    <Link to="/home/dashboard" className="btn-primary font-label">
                       Dashboard <span>→</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/home/login" className="text-gray-600 font-label hover:text-primary-600 smooth-hover">
                    Log in
                  </Link>
                  <Link to="/home/dashboard" className="btn-primary font-label">
                    Dashboard <span>→</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full mx-auto">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BlogSpace. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
