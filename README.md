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
git clone https://github.com/aaronGeb/polling-app
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

Vercel is the perfect platform for deploying Next.js applications with automatic deployments, global CDN, and excellent performance.

#### **Step 1: Prepare Your Repository**

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Ensure your repository is public** (or you have a Vercel Pro account for private repos)

#### **Step 2: Deploy to Vercel**

1. **Go to [vercel.com](https://vercel.com)** and sign in with your GitHub account
2. **Click "New Project"**
3. **Import your repository** from the list
4. **Configure your project**:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `polling-app` (if your Next.js app is in a subdirectory)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

#### **Step 3: Configure Environment Variables**

1. **In the Vercel dashboard**, go to your project settings
2. **Navigate to "Environment Variables"**
3. **Add your Supabase credentials**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Set deployment scope** to "Production, Preview, Development"

#### **Step 4: Deploy**

1. **Click "Deploy"**
2. **Wait for build completion** (usually 2-5 minutes)
3. **Your app will be live** at `https://your-project-name.vercel.app`

#### **Step 5: Custom Domain (Optional)**

1. **Go to "Domains"** in your Vercel project settings
2. **Add your custom domain** (e.g., `polls.yourdomain.com`)
3. **Update your Supabase settings**:
   - Go to Supabase Dashboard → Authentication → Settings
   - Add your Vercel domain to "Site URL"
   - Add your custom domain if using one

#### **Step 6: Automatic Deployments**

- **Every push to main branch** triggers automatic deployment
- **Preview deployments** are created for pull requests
- **Rollback** to previous versions anytime

### **Vercel-Specific Benefits**

- **⚡ Edge Network**: Global CDN for fast loading worldwide
- **🔄 Zero-Downtime**: Instant deployments with no interruption
- **📱 Mobile Optimization**: Automatic mobile performance optimization
- **🔒 SSL/HTTPS**: Free SSL certificates for all domains
- **📊 Analytics**: Built-in performance monitoring
- **🌍 Edge Functions**: Serverless functions at the edge

### **Troubleshooting Vercel Deployment**

#### **Build Errors**
```bash
# Common issues and solutions:
# 1. Node.js version mismatch
# Solution: Add .nvmrc file to your project root
echo "18.18.0" > .nvmrc

# 2. Build command fails
# Solution: Check package.json scripts
npm run build

# 3. Environment variables missing
# Solution: Verify in Vercel dashboard
```

#### **Runtime Errors**
```bash
# 1. Check Vercel function logs
# 2. Verify environment variables
# 3. Test locally with production build
npm run build
npm start
```

### **Other Deployment Platforms**

#### **Netlify**
- **Similar to Vercel** with drag-and-drop deployment
- **Good for static sites** and Next.js apps
- **Free tier available**

#### **Railway**
- **Full-stack platform** with database hosting
- **Good for full applications** with backend needs
- **Pay-per-use pricing**

#### **DigitalOcean App Platform**
- **Managed Kubernetes** with simple deployment
- **Good for complex applications** requiring more control
- **Starting at $5/month**

#### **AWS Amplify**
- **Enterprise-grade** deployment platform
- **Advanced features** like A/B testing
- **Pay-per-use pricing**

### **Pre-Deployment Checklist**

- [ ] **Environment variables** configured
- [ ] **Database schema** created in Supabase
- [ ] **Sample data** loaded (optional)
- [ ] **Build command** works locally (`npm run build`)
- [ ] **All dependencies** in `package.json`
- [ ] **Git repository** up to date
- [ ] **Supabase project** configured and tested

### **Post-Deployment Steps**

1. **Test your live application**:
   - Create a new poll
   - Vote on existing polls
   - Test user authentication
   - Verify real-time updates

2. **Monitor performance**:
   - Check Vercel Analytics
   - Monitor Supabase usage
   - Test on different devices

3. **Set up monitoring**:
   - Enable Vercel Analytics
   - Set up Supabase monitoring
   - Configure error tracking

### **Production Considerations**

#### **Performance**
- **Enable Vercel Analytics** for performance monitoring
- **Use Next.js Image optimization** for images
- **Implement proper caching** strategies

#### **Security**
- **Environment variables** are encrypted in Vercel
- **HTTPS** is automatically enabled
- **Row Level Security** in Supabase protects your data

#### **Scalability**
- **Vercel automatically scales** based on traffic
- **Supabase handles database scaling** automatically
- **Edge functions** for global performance

### **Cost Optimization**

#### **Vercel Pricing**
- **Hobby Plan**: Free (100GB bandwidth/month)
- **Pro Plan**: $20/month (1TB bandwidth/month)
- **Enterprise**: Custom pricing

#### **Supabase Pricing**
- **Free Tier**: 500MB database, 2GB bandwidth
- **Pro Plan**: $25/month (8GB database, 250GB bandwidth)
- **Enterprise**: Custom pricing

### **Deployment Best Practices**

1. **Use environment variables** for all sensitive data
2. **Test locally** before deploying
3. **Monitor your application** after deployment
4. **Set up staging environment** for testing
5. **Use semantic versioning** for releases
6. **Document deployment process** for team members

---

**🚀 Your polling app is now ready for production deployment on Vercel!**

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
