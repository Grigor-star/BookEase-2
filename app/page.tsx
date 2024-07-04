import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full items-center justify-center">
      <Link href="/auth/login">
        <Button>Sign In</Button>
      </Link>
    </main>
  );
}
