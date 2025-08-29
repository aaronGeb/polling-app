-- Sample Data for Polling App
-- This script adds realistic polls, options, and votes to your existing tables
-- Note: This script uses NULL values for user references to avoid foreign key constraints
-- In a real application, you would replace these with actual user IDs from auth.users

-- Sample polls with realistic content (using NULL for created_by to avoid FK constraints)
INSERT INTO polls (id, title, description, created_by, created_at, is_active) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'What is your favorite programming language in 2024?',
    'Choose the programming language you enjoy working with the most this year. Consider factors like productivity, community support, and job opportunities.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '5 days',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Which framework do you prefer for building web applications?',
    'Select the web framework that provides the best developer experience and performance for your projects.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '3 days',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'What is your preferred database for modern applications?',
    'Choose the database technology that best fits your application needs and team expertise.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '1 day',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'Which cloud platform do you use for deployment?',
    'Select the cloud platform that offers the best features and pricing for your projects.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '2 days',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440005',
    'What is your favorite code editor or IDE?',
    'Choose the development environment that makes you most productive and comfortable.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '4 days',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440006',
    'Which mobile development approach do you prefer?',
    'Select your preferred method for building mobile applications.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '6 days',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440007',
    'What is your favorite way to learn new technologies?',
    'Choose the learning method that works best for you when exploring new programming concepts.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '1 week',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440008',
    'Which testing framework do you use most often?',
    'Select the testing framework that you rely on for ensuring code quality.',
    NULL, -- Will be set when you have actual users
    NOW() - INTERVAL '5 days',
    true
);

-- Sample poll options for each poll
INSERT INTO poll_options (id, poll_id, option_text, created_at) VALUES
-- Programming Language Poll
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'JavaScript/TypeScript', NOW() - INTERVAL '5 days'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Python', NOW() - INTERVAL '5 days'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Rust', NOW() - INTERVAL '5 days'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Go', NOW() - INTERVAL '5 days'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'C#', NOW() - INTERVAL '5 days'),

-- Web Framework Poll
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Next.js', NOW() - INTERVAL '3 days'),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'React', NOW() - INTERVAL '3 days'),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', 'Vue.js', NOW() - INTERVAL '3 days'),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440002', 'Angular', NOW() - INTERVAL '3 days'),
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'Svelte', NOW() - INTERVAL '3 days'),

-- Database Poll
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440003', 'PostgreSQL', NOW() - INTERVAL '1 day'),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', 'MongoDB', NOW() - INTERVAL '1 day'),
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', 'MySQL', NOW() - INTERVAL '1 day'),
('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440003', 'Redis', NOW() - INTERVAL '1 day'),
('660e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440003', 'Supabase', NOW() - INTERVAL '1 day'),

-- Cloud Platform Poll
('660e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440004', 'AWS', NOW() - INTERVAL '2 days'),
('660e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440004', 'Vercel', NOW() - INTERVAL '2 days'),
('660e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440004', 'Google Cloud', NOW() - INTERVAL '2 days'),
('660e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440004', 'Azure', NOW() - INTERVAL '2 days'),
('660e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440004', 'Netlify', NOW() - INTERVAL '2 days'),

-- Code Editor Poll
('660e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440005', 'VS Code', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440005', 'IntelliJ IDEA', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440005', 'Vim/Neovim', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440005', 'Sublime Text', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440005', 'Atom', NOW() - INTERVAL '4 days'),

-- Mobile Development Poll
('660e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440006', 'React Native', NOW() - INTERVAL '6 days'),
('660e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440006', 'Flutter', NOW() - INTERVAL '6 days'),
('660e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440006', 'Native iOS (Swift)', NOW() - INTERVAL '6 days'),
('660e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440006', 'Native Android (Kotlin)', NOW() - INTERVAL '6 days'),
('660e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440006', 'Progressive Web Apps', NOW() - INTERVAL '6 days'),

-- Learning Method Poll
('660e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440007', 'Online Courses (Udemy, Coursera)', NOW() - INTERVAL '1 week'),
('660e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440007', 'Documentation & Tutorials', NOW() - INTERVAL '1 week'),
('660e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440007', 'YouTube Videos', NOW() - INTERVAL '1 week'),
('660e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440007', 'Books & E-books', NOW() - INTERVAL '1 week'),
('660e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440007', 'Hands-on Projects', NOW() - INTERVAL '1 week'),

-- Testing Framework Poll
('660e8400-e29b-41d4-a716-446655440036', '550e8400-e29b-41d4-a716-446655440008', 'Jest', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440008', 'Vitest', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440008', 'Cypress', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440008', 'Playwright', NOW() - INTERVAL '4 days'),
('660e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440008', 'Testing Library', NOW() - INTERVAL '4 days');

-- Note: We're not inserting votes yet because they require valid user IDs
-- Once you have users in your auth.users table, you can add votes

-- Display summary of what was added
SELECT 
    'Sample Data Summary' as info,
    COUNT(DISTINCT p.id) as total_polls,
    COUNT(DISTINCT po.id) as total_options,
    '0' as total_votes
FROM polls p
LEFT JOIN poll_options po ON p.id = po.poll_id
WHERE p.id IN (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440006',
    '550e8400-e29b-41d4-a716-446655440007',
    '550e8400-e29b-41d4-a716-446655440008'
);

-- Instructions for adding votes later:
-- 1. First, create a user account in your app (this will add them to auth.users)
-- 2. Get their user ID from the auth.users table
-- 3. Update the polls table to set created_by to their user ID
-- 4. Then you can add votes using their user ID

-- Example of how to update polls with a real user ID (replace with actual user ID):
-- UPDATE polls SET created_by = 'your-actual-user-id-here' WHERE created_by IS NULL;

-- Example of how to add votes later (replace with actual user IDs):
-- INSERT INTO votes (poll_id, option_id, user_id) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'your-user-id');
