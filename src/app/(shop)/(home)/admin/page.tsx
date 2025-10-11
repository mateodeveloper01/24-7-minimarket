import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-[40vh] ">
      <a href="/auth/login">
        <Button className="bg-primary">Log in</Button>
      </a>
    </div>
  );
}
