import { Link } from "react-router-dom";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./Signup-form";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-background">
            <div className="w-full max-w-md p-6">
                {type === "signup" ? (
                    <div className="space-y-4">
                        <SignUpForm />
                        <div className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/signin" className="underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <LoginForm />
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}