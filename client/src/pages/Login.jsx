import { useState } from 'react';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        setIsLoading(true);
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage your invoices efficiently.
                    </p>
                </div>
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="absolute left-4 flex items-center">
                        <GoogleIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />
                    </span>
                    {isLoading ? (
                        <span className="animate-pulse">Connecting...</span>
                    ) : (
                        'Continue with Google'
                    )}
                </button>
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

const GoogleIcon = (props) => (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
        <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
        />
    </svg>
);
