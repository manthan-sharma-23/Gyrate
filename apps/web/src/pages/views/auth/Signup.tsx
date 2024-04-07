import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthInputForm } from "@/utils/types/types";
import Loading from "@/components/ui/Loading";
import { signUpWithEmail } from "@/features/functions/auth/signup-email";

function Signup() {
  const [form, setForm] = useState<Partial<AuthInputForm>>({});
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (form.email && form.password) {
      setLoading(true);
      signUpWithEmail({name:form.name, email: form.email, password: form.password })
        .then((data) => {
          setLoading(false);
          if (data) window.localStorage.setItem("token", data?.token);
          window.location.assign("/");
        })
        .catch((_err) => {
          console.log(_err);
          setLoading(false);
        });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="w-full">
            <Label htmlFor="last-name">Name</Label>
            <Input
              id="last-name"
              placeholder="Robinson"
              required
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) =>
                setForm((v) => ({ ...v, email: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) =>
                setForm((v) => ({ ...v, password: e.target.value }))
              }
            />
          </div>
          <Button type="submit" className="w-full" onClick={submitHandler}>
            {loading ? <Loading /> : "Create an account"}
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Signup;
