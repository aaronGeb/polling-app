"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/authContext';

export default function DatabaseTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const { user, loading } = useAuth();

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runTests = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      // Test 1: Environment Variables
      addResult('🔍 Testing environment variables...');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        addResult('❌ Environment variables missing! Check .env.local file');
        return;
      }
      addResult('✅ Environment variables found');

      // Test 2: Supabase Client Connection
      addResult('🔍 Testing Supabase client connection...');
      try {
        const { data, error } = await supabase.from('polls').select('count', { count: 'exact', head: true });
        if (error) {
          addResult(`❌ Database connection failed: ${error.message}`);
          if (error.code === 'PGRST116') {
            addResult('💡 This usually means the database tables don\'t exist yet');
          }
        } else {
          addResult('✅ Database connection successful');
        }
      } catch (err) {
        addResult(`❌ Database connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Test 3: Authentication Status
      addResult('🔍 Testing authentication status...');
      if (loading) {
        addResult('⏳ Authentication still loading...');
      } else if (user) {
        addResult(`✅ User authenticated: ${user.email} (ID: ${user.id})`);
      } else {
        addResult('❌ No user authenticated');
      }

      // Test 4: Database Tables
      addResult('🔍 Testing database tables...');
      try {
        const { data: polls, error: pollsError } = await supabase.from('polls').select('*').limit(1);
        if (pollsError) {
          addResult(`❌ Polls table error: ${pollsError.message}`);
        } else {
          addResult('✅ Polls table accessible');
        }

        const { data: options, error: optionsError } = await supabase.from('poll_options').select('*').limit(1);
        if (optionsError) {
          addResult(`❌ Poll options table error: ${optionsError.message}`);
        } else {
          addResult('✅ Poll options table accessible');
        }

        const { data: votes, error: votesError } = await supabase.from('votes').select('*').limit(1);
        if (votesError) {
          addResult(`❌ Votes table error: ${votesError.message}`);
        } else {
          addResult('✅ Votes table accessible');
        }
      } catch (err) {
        addResult(`❌ Table test error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      // Test 5: Sample Data
      addResult('🔍 Checking for sample data...');
      try {
        const { data: polls, error } = await supabase.from('polls').select('*');
        if (error) {
          addResult(`❌ Error fetching polls: ${error.message}`);
        } else {
          addResult(`✅ Found ${polls?.length || 0} polls in database`);
        }
      } catch (err) {
        addResult(`❌ Sample data check error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

    } catch (error) {
      addResult(`❌ Test suite error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🔧 Database Connection Test
      </h2>

      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <button
          onClick={runTests}
          disabled={isTesting}
          style={{
            backgroundColor: isTesting ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: isTesting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {isTesting ? 'Running Tests...' : '🚀 Run Database Tests'}
        </button>

        <button
          onClick={() => setTestResults([])}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          🗑️ Clear Results
        </button>
      </div>

      {/* Current Status */}
      <div style={{
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Current Status:</h3>
        <p style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>Auth Loading:</strong> {loading ? 'Yes' : 'No'}
        </p>
        <p style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>User Authenticated:</strong> {user ? 'Yes' : 'No'}
        </p>
        <p style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>User Email:</strong> {user?.email || 'Not available'}
        </p>
        <p style={{ margin: '4px 0', fontSize: '14px' }}>
          <strong>User ID:</strong> {user?.id || 'Not available'}
        </p>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Test Results:</h3>
          {testResults.map((result, index) => (
            <div
              key={index}
              style={{
                padding: '8px 0',
                borderBottom: index < testResults.length - 1 ? '1px solid #e5e7eb' : 'none',
                fontSize: '14px',
                fontFamily: 'monospace'
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '24px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#1e40af' }}>
          💡 Troubleshooting Steps:
        </h3>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#1e40af', lineHeight: '1.6' }}>
          <li>Make sure you have a <code>.env.local</code> file with your Supabase credentials</li>
          <li>Run the database schema setup from <code>database-schema.sql</code></li>
          <li>Add sample data from <code>sample-data.sql</code></li>
          <li>Check that you're logged in to the app</li>
          <li>Verify your Supabase project is active and accessible</li>
        </ol>
      </div>
    </div>
  );
}
