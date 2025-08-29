# 🚀 Polling App Setup Guide

## 📋 **Prerequisites**
- ✅ Next.js app is running
- ✅ Supabase project created
- ✅ Environment variables configured

## 🗄️ **Database Setup (Required)**

### **Step 1: Create Database Tables**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy and paste the entire content from `database-schema.sql`
6. Click **"Run"** button

**Expected Result:** Tables created successfully with no errors

### **Step 2: Add Sample Data (Recommended)**
1. In the same SQL Editor, create a **new query**
2. Copy and paste the entire content from `sample-data.sql`
3. Click **"Run"** button

**Expected Result:** 
```
Sample data inserted successfully! | 5 | 47 | 63
```

## 🧪 **Test Your Setup**

### **Check Tables Exist:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Should show:**
- `polls`
- `poll_options`
- `votes`

### **Check Sample Data:**
```sql
SELECT COUNT(*) as total_polls FROM polls;
SELECT COUNT(*) as total_options FROM poll_options;
SELECT COUNT(*) as total_votes FROM votes;
```

## 🎯 **What You'll Get**

After running the sample data script, you'll have:

- **5 Sample Polls** with engaging topics
- **47 Poll Options** across all polls
- **63 Sample Votes** to make polls look active
- **Real-time voting** functionality
- **Beautiful results visualization**

## 🎨 **Sample Polls Included:**

1. **"What is your favorite programming language?"** - 10 options
2. **"Best pizza topping combination?"** - 10 options  
3. **"Which social media platform do you use most?"** - 10 options
4. **"What is your preferred way to learn new skills?"** - 10 options
5. **"Favorite season of the year?"** - 4 options

## 🚨 **Troubleshooting**

### **Error: "Table doesn't exist"**
- Make sure you ran `database-schema.sql` first
- Check that all tables were created successfully

### **Error: "Permission denied"**
- Ensure you're logged in as project owner
- Check Row Level Security (RLS) policies

### **Error: "Foreign key constraint"**
- Tables must be created in the correct order
- Run the schema file completely

### **No data showing in app**
- Check browser console for errors
- Verify environment variables are correct
- Ensure database connection is working

## 🎉 **After Setup**

1. **Refresh your app** in the browser
2. **Navigate to "Polls" tab** to see sample polls
3. **Click on polls** to vote and see results
4. **Create your own polls** using the "Create Poll" tab

## 🔍 **Verify Everything Works**

- ✅ **Landing page** displays beautifully
- ✅ **Navigation** works between all tabs
- ✅ **Sample polls** are visible
- ✅ **Voting functionality** works
- ✅ **Results display** correctly
- ✅ **Create poll form** functions

## 🚀 **Next Steps**

1. **Customize the landing page** content
2. **Add more sample polls** if desired
3. **Test user authentication** (login/register)
4. **Share your app** with friends and family!

---

**Need Help?** Check the browser console for detailed error messages and refer to the main README.md for comprehensive setup instructions.
