import { useGoogleLogin } from '@react-oauth/google';
import { User } from 'lucide-react';

interface LoginButtonProps {
    children?: React.ReactNode;
    className?: string;
}

const LoginButton = ({ children, className }: LoginButtonProps) => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log('Login Success:', tokenResponse);
        },
        onError: () => console.log('Login Failed'),
    });

    if (children) {
        return (
            <button onClick={() => login()} className={className}>
                {children}
            </button>
        );
    }

    // Fallback Default: Circular Style (User Request: Small circle to match Upgrade button)
    return (
        <button
            onClick={() => login()}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-black"
            title="Sign in with Google"
        >
            <User size={16} />
        </button>
    );
};

export default LoginButton;
