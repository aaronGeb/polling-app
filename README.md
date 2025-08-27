# Polling App - Authentication Flow 🚀

This is a **Next.js + Supabase** starter project that demonstrates how to set up **authentication** with **AI-assisted development**.  
It includes a **login and registration flow**, Supabase client setup, and form validation using **react-hook-form** + **zod**.  

---

## ✨ Features
- ⚡ **Next.js 13 (App Router)**
- 🔐 **Authentication with Supabase**
- 🎨 **UI powered by Tailwind & shadcn/ui**
- 📝 **Form validation with react-hook-form + zod**
- 🧑‍💻 **AI-assisted scaffold** for auth pages and components
- 📂 **Clean project structure**
- ✅ Ready to extend with protected routes and polling features

---

## 📂 Project Structure

```
polling-app/
├─ app/
│ ├─ auth/
│ │ ├─ login/page.tsx # Login page
│ │ └─ register/page.tsx # Register page
│ ├─ layout.tsx # Global layout with AuthProvider
│ └─ page.tsx # Home page
├─ components/
│ ├─ LoginForm.tsx # Login form component
│ └─ RegisterForm.tsx # Register form component
├─ lib/
│ ├─ supabaseClient.ts # Supabase client config
│ └─ authContext.tsx # Auth provider & hook
├─ .env.local # Environment variables
├─ package.json
└─ tsconfig.json
```

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aarongeb/polling-app.git
cd polling-app
```

### 2. Install Dependencies
```
npm install
```
### 3. Configure Supabase
<ol>
<li>Go to <a href="https://app.supabase.com/" target="_blank"> Supabase</a></li>

<li>Create a new project.</li>

<li>Copy your Project URL and Anon Key.</li>

<li>Add them to .env.local:</li>
</ol>

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
Then open http://localhost:3000

### 🔑 Authentication Flow

- Register: Creates a new user in Supabase Auth.

- Login: Signs in with Supabase email + password.

- Auth Context: Keeps track of the logged-in user globally.

- Redirects: You can extend logic to protect routes (e.g. /dashboard).
### 🧩 Tech Stack

- Framework: Next.js

- Database & Auth: Supabase

- Forms & Validation: React Hook Form + Zod

- UI: Tailwind CSS + shadcn/ui

### 🚀 Next Steps

- Add protected routes (redirect if not logged in)

- Create a Dashboard page

- Build the Polling feature (CRUD polls, vote, results)

- Add social login (Google, GitHub)

- Write unit & integration tests
### 📜 License

This project is open-source under the [MIT License]()
