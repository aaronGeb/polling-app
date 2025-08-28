# 🗳️ Polling App

A modern, real-time polling application built with **Next.js 15**, **React 19**, and **Supabase**. Create polls, gather votes, and see results in real-time with a beautiful, responsive interface.

## ✨ Features

- **🚀 Lightning Fast**: Create polls in under 30 seconds
- **📊 Real-time Results**: See votes and results update instantly
- **🔒 Secure & Private**: Enterprise-grade security with Supabase
- **📱 Mobile First**: Beautiful responsive design for all devices
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations
- **🌐 Share Anywhere**: Easy sharing and collaboration
- **⚡ Real-time Updates**: Live voting and result updates
- **🔐 User Authentication**: Secure login and registration system

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Inline CSS with modern design patterns
- **Backend**: Supabase (PostgreSQL + Real-time + Auth)
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Database**: PostgreSQL with Row Level Security (RLS)

## 📋 Prerequisites

- **Node.js**: Version 18.18.0 or higher
- **npm**: Version 8 or higher
- **Supabase Account**: Free account at [supabase.com](https://supabase.com)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd polling-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get your Supabase credentials:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select existing one
3. Go to Settings → API
4. Copy the Project URL and anon/public key

### 4. Set Up Database

#### Option A: Use the SQL Scripts (Recommended)

1. **Open Supabase Dashboard** → SQL Editor
2. **Run the database schema**:

```sql
-- Copy and paste the contents of database-schema.sql
-- This creates all necessary tables and security policies
```

3. **Add sample data**:

```sql
-- Copy and paste the contents of sample-data.sql
-- This adds sample polls and options for testing
```

#### Option B: Manual Setup

1. Create tables: `polls`, `poll_options`, `votes`
2. Set up Row Level Security (RLS) policies
3. Create indexes for performance

### 5. Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

## 🗄️ Database Schema

### Tables Structure

#### `polls` Table
- `id`: UUID (Primary Key)
- `title`: TEXT (Required)
- `description`: TEXT (Optional)
- `created_by`: UUID (User ID)
- `created_at`: TIMESTAMP
- `is_active`: BOOLEAN

#### `poll_options` Table
- `id`: UUID (Primary Key)
- `poll_id`: UUID (Foreign Key to polls)
- `option_text`: TEXT (Required)
- `created_at`: TIMESTAMP

#### `votes` Table
- `id`: UUID (Primary Key)
- `poll_id`: UUID (Foreign Key to polls)
- `option_id`: UUID (Foreign Key to poll_options)
- `user_id`: UUID (User ID)
- `created_at`: TIMESTAMP

### Security Features
- **Row Level Security (RLS)** enabled on all tables
- **User authentication** required for creating polls and voting
- **Secure API endpoints** with proper validation
- **Data isolation** between users

## 🎯 Usage Guide

### Creating a Poll

1. **Sign in** to your account
2. **Navigate** to the "Create Poll" tab
3. **Fill in** the poll details:
   - Title (required)
   - Description (optional)
   - Add 2-10 poll options
4. **Click** "Create Poll"
5. **Share** your poll with others

### Voting on Polls

1. **Browse** available polls in the "Polls" tab
2. **Click** on a poll to view options
3. **Select** your preferred option
4. **View** real-time results
5. **Change** your vote anytime

### Managing Your Polls

1. **Go to** the "Profile" tab
2. **View** all polls you've created
3. **See** voting statistics
4. **Monitor** real-time participation

## 🔧 Troubleshooting

### Common Issues

#### 1. "Missing script: dev" Error
**Problem**: npm can't find the dev script
**Solution**: Make sure you're in the correct directory (`polling-app` subdirectory)

```bash
cd polling-app  # Navigate to the correct directory
npm run dev     # Now it should work
```

#### 2. Database Connection Failed
**Problem**: Can't connect to Supabase
**Solution**: Check your environment variables

```bash
# Verify .env.local exists and has correct values
cat .env.local

# Restart your dev server after changing environment variables
npm run dev
```

#### 3. Tables Don't Exist
**Problem**: "Relation does not exist" errors
**Solution**: Run the database setup scripts

1. Go to Supabase Dashboard → SQL Editor
2. Run `database-schema.sql`
3. Run `sample-data.sql`

#### 4. Authentication Issues
**Problem**: Can't log in or create polls
**Solution**: Check Supabase Auth settings

1. Go to Supabase Dashboard → Authentication
2. Enable Email/Password provider
3. Check if email confirmation is required

#### 5. Text Not Visible
**Problem**: Form text is invisible or hard to read
**Solution**: This has been fixed in the latest version with:
- Better color contrast
- Increased font weights
- Pure white backgrounds
- Enhanced typography

### Debug Tools

Use the **Debug tab** (🔧 icon) in the navigation to:
- Test database connectivity
- Check environment variables
- Verify authentication status
- Diagnose specific errors

## 📱 Features in Detail

### Landing Page
- **Hero Section**: Engaging introduction with call-to-action
- **Feature Cards**: Highlight key benefits
- **Statistics**: Show app capabilities
- **Responsive Design**: Works on all devices

### Authentication
- **Beautiful Login/Register Pages**: Split-screen design with gradients
- **Secure Authentication**: Supabase Auth with proper validation
- **User Management**: Profile creation and management
- **Session Handling**: Persistent login state

### Poll Management
- **Create Polls**: Intuitive form with validation
- **Real-time Voting**: Instant vote updates
- **Result Visualization**: Progress bars and percentages
- **User Permissions**: Secure access control

### User Experience
- **Modern UI**: Clean, professional design
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Mobile-first approach
- **Accessibility**: WCAG compliant design

## 🚀 Deployment

### Vercel (Recommended)

1. **Push** your code to GitHub
2. **Connect** your repository to Vercel
3. **Add** environment variables in Vercel dashboard
4. **Deploy** automatically on every push

### Other Platforms

- **Netlify**: Similar to Vercel
- **Railway**: Full-stack deployment
- **DigitalOcean**: Custom server setup
- **AWS**: Enterprise deployment

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **User Authentication**: Secure login system
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Supabase built-in security
- **HTTPS Only**: Secure connections
- **Environment Variables**: Secure credential management

## 📊 Performance

- **Next.js 15**: Latest performance optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Built-in image handling
- **Code Splitting**: Automatic bundle optimization
- **Caching**: Intelligent caching strategies

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Guidelines

- **TypeScript**: Use strict typing
- **Inline CSS**: Keep styling consistent
- **Component Structure**: Follow React best practices
- **Error Handling**: Comprehensive error management
- **Testing**: Test all user flows

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

1. **Check** this README for common solutions
2. **Use** the Debug tab in the app
3. **Review** the error messages in browser console
4. **Check** Supabase dashboard for database issues

### Useful Links

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs**: [react.dev](https://react.dev)
- **TypeScript Docs**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

### Community

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Contributions**: Help improve the project

## 🎉 What's Next?

### Planned Features

- **Advanced Analytics**: Detailed voting insights
- **Poll Templates**: Pre-built poll structures
- **Export Options**: CSV, PDF results
- **API Access**: RESTful API endpoints
- **Mobile App**: React Native version
- **Real-time Chat**: Poll discussions
- **Advanced Permissions**: Role-based access
- **Multi-language**: Internationalization

### Current Status

- ✅ **Core Functionality**: Complete
- ✅ **User Authentication**: Complete
- ✅ **Poll Creation**: Complete
- ✅ **Real-time Voting**: Complete
- ✅ **Responsive Design**: Complete
- ✅ **Security Features**: Complete
- 🔄 **Performance Optimization**: In Progress
- 🔄 **Advanced Features**: Planning

---

**Happy Polling! 🗳️✨**

*Built with ❤️ using Next.js, React, and Supabase*
