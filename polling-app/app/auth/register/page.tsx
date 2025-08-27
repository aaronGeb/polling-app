import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <RegisterForm />
      </div>
    </main>
  );
}
