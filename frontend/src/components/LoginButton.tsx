import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const LoginButton = () => {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log('Login Success:', credentialResponse);
                if (credentialResponse.credential) {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log('Decoded JWT:', decoded);
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
            shape="circle"
            text="signin_with"
        />
    );
};

export default LoginButton;
