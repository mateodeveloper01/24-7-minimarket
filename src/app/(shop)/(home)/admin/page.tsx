import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-[40vh] ">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Auth0 requiere navegación completa, no el router cliente. */}
      <a href="/auth/login">
        <Button className="bg-primary">Log in</Button>
      </a>
    </div>
  );
}
