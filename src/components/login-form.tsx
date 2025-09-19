import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { signinInput } from "../zod";
import { BACKEND_URL } from "../config";
import { LoadingSpinner } from "../lib/loading";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminToggle = (checked: boolean) => {
    setIsAdminLogin(checked);
    if (checked) {
      // Pre-fill admin credentials for convenience
      setEmail("admin@sweetshop.com");
      setPassword("admin123");
    } else {
      // Clear fields when toggling off
      setEmail("");
      setPassword("");
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // Validate inputs
    const result = signinInput.safeParse({ email, password });
    if (!result.success) {
      alert(result.error.issues.map((e) => e.message).join("\n"));
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password });

      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log(token);

      // Hardcoded role logic
      if (email === "admin@sweetshop.com" && password === "admin123") {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("role", "user");
        navigate("/dashboard");
      }
    } catch (e) {
      console.error(e);
      alert("Error while signing in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="admin-mode">Sign in as Admin</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Use pre-filled admin credentials.
            </p>
          </div>
          <Switch
            id="admin-mode"
            checked={isAdminLogin}
            onCheckedChange={handleAdminToggle}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinner className="h-5 w-5" />
          ) : (
            "Login"
          )}
        </Button>

      </div>
    </form>
  );
}
