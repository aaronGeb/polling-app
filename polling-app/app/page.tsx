import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Polling App</h1>
      <Link href="/auth/login" className="text-blue-600 underline">Login</Link>
      <Link href="/auth/register" className="text-blue-600 underline">Register</Link>
    </main>
  );
}
