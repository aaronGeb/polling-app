# 🗳️ Polling App

A modern, real-time polling application built with Next.js 15, React 19, TypeScript, and Supabase. Create polls, vote on them, and see real-time results with a beautiful, responsive interface.

## ✨ Features

- **🔐 User Authentication** - Secure signup/login with Supabase Auth
- **📊 Create Polls** - Build custom polls with multiple options
- **🗳️ Real-time Voting** - Vote on polls and see instant results
- **📱 Responsive Design** - Works perfectly on all devices
- **🚀 Dynamic Poll Pages** - Individual pages for each poll with detailed results
- **👤 User Profiles** - View your created polls and voting history
- **🎨 Modern UI** - Beautiful, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Inline CSS with modern design principles
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (optimized for Next.js)

## 📋 Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn package manager
- Supabase account and project
- Vercel account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aaronGeb/polling-app.git
cd polling-app/polling-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Run the database schema** from `database-schema.sql`
4. **Add sample data** from `sample-data.sql`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

### Tables

- **`polls`** - Poll information (title, description, creator)
- **`poll_options`** - Available voting options for each poll
- **`votes`** - User votes with timestamps
- **`auth.users`** - User accounts (managed by Supabase)

### Key Features

- **UUID primary keys** for security
- **Foreign key constraints** for data integrity
- **Row Level Security (RLS)** for user privacy
- **Automatic timestamps** for audit trails

## 📁 Project Structure

```
polling-app/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── callback/            # Auth callback route
│   ├── polls/                   # Poll-related pages
│   │   └── [id]/               # Dynamic poll detail page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── CreatePollForm.tsx       # Poll creation form
│   ├── PollCard.tsx             # Individual poll display
│   ├── PollList.tsx             # List of all polls
│   ├── Navigation.tsx           # Main navigation
│   ├── UserProfile.tsx          # User profile display
│   ├── LoginForm.tsx            # Login form
│   ├── RegisterForm.tsx         # Registration form
│   ├── InteractiveButton.tsx    # Interactive button component
│   └── DatabaseTest.tsx         # Database testing utility
├── lib/                         # Utility libraries
│   ├── authContext.tsx          # Authentication context
│   ├── supabaseClient.ts        # Supabase client configuration
│   ├── pollService.ts           # Poll-related API functions
│   └── database.types.ts        # TypeScript type definitions
├── public/                      # Static assets
├── database-schema.sql          # Database setup script
├── sample-data.sql              # Sample data insertion
├── SETUP-GUIDE.md               # Database setup guide
└── package.json                 # Dependencies and scripts
```

## 🔧 Configuration

### Supabase Setup

1. **Create a new project** at [supabase.com](https://supabase.com)
2. **Get your project URL and anon key** from Settings → API
3. **Update environment variables** with your credentials
4. **Run the database schema** in SQL Editor

### Authentication Settings

Update these URLs in your Supabase project:

- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: 
  - `https://your-app.vercel.app/auth/callback`
  - `https://your-app.vercel.app`

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push your code** to GitHub
2. **Connect your repository** to Vercel
3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push

### Environment Variables in Vercel

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Post-Deployment Steps

1. **Update Supabase redirect URLs** to your Vercel domain
2. **Test authentication flow** (signup, email verification, login)
3. **Verify database connection** from production environment

## 📱 Usage Guide

### For Users

1. **Sign up** with your email address
2. **Verify your email** (check spam folder)
3. **Browse available polls** on the home page
4. **Vote on polls** by selecting an option
5. **View real-time results** with progress bars
6. **Create your own polls** using the create tab

### For Developers

1. **Check the components** for UI patterns
2. **Review pollService.ts** for API examples
3. **Use the DatabaseTest component** for debugging
4. **Monitor Supabase logs** for backend issues

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **User authentication** required for sensitive operations
- **Input validation** with Zod schemas
- **CSRF protection** via Supabase Auth
- **Secure session management**

## 🐛 Troubleshooting

### Common Issues

1. **"Error fetching polls"** - Check database tables exist
2. **Authentication redirects to localhost** - Update Supabase URLs
3. **Build failures** - Ensure Node.js version is 18.18.0+
4. **Database connection errors** - Verify environment variables

### Debug Tools

- **DatabaseTest component** - Test database connectivity
- **Browser console** - Check for JavaScript errors
- **Supabase dashboard** - Monitor database and auth logs
- **Vercel build logs** - Check deployment issues

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Future Enhancements

- [ ] **Real-time updates** with Supabase subscriptions
- [ ] **Poll categories** and search functionality
- [ ] **Advanced analytics** and charts
- [ ] **Mobile app** with React Native
- [ ] **Social sharing** and embedding
- [ ] **Multi-language support**
- [ ] **Dark mode** theme
- [ ] **Export results** to CSV/PDF

## 📞 Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Review the Supabase documentation**
3. **Open an issue** on GitHub
4. **Check the Vercel deployment logs**

---

**Happy Polling! 🗳️✨**
