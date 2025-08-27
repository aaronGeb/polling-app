import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>
    </main>
  );
}
