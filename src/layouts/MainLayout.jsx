import { Outlet, Link } from 'react-router-dom';
import { PenTool, LogOut, User } from 'lucide-react';
import { useAuth } from '../features/auth/useAuth';
import Logo from '../components/Logo';

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white sticky top-0 z-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/home">
              <Logo />
            </Link>

            <nav className="flex items-center gap-6">
              <Link to="/home/about" className="text-gray-500 font-medium hover:text-primary-600 transition-colors hidden sm:block">
                About
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                  <Link to="/home/dashboard" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2">
                    Dashboard <span>&rarr;</span>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/home/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Log in
                  </Link>
                  <Link to="/home/dashboard" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2">
                    Dashboard <span>&rarr;</span>
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
