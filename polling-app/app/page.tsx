'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import PollList from '../components/PollList'
import CreatePollForm from '../components/CreatePollForm'
import UserProfile from '../components/UserProfile'


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'home' | 'polls' | 'create' | 'profile'>('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage onGetStarted={() => setActiveTab('polls')} />
      case 'polls':
        return <PollList />
      case 'create':
        return <CreatePollForm onPollCreated={() => setActiveTab('polls')} />
      case 'profile':
        return <UserProfile />

      default:
        return <LandingPage onGetStarted={() => setActiveTab('polls')} />
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        {renderContent()}
      </main>
    </div>
  )
}

// Landing Page Component
function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 0',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Create Polls, Get Opinions, 
          <span style={{ color: '#3b82f6' }}> Make Decisions</span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#6b7280',
          marginBottom: '40px',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 40px auto'
        }}>
          Build interactive polls in seconds. Gather real-time feedback from your audience. 
          Make data-driven decisions with beautiful visualizations.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onGetStarted}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3b82f6'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            🗳️ Start Polling
          </button>
          
          <button
            onClick={() => window.location.href = '/auth/register'}
            style={{
              backgroundColor: 'white',
              color: '#3b82f6',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ✨ Sign Up Free
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        marginTop: '40px'
      }}>
        <FeatureCard
          icon="🚀"
          title="Lightning Fast"
          description="Create polls in under 30 seconds. No complex setup required."
        />
        <FeatureCard
          icon="📊"
          title="Real-time Results"
          description="See votes and results update instantly as people participate."
        />
        <FeatureCard
          icon="🔒"
          title="Secure & Private"
          description="Your data is protected with enterprise-grade security."
        />
        <FeatureCard
          icon="📱"
          title="Mobile Friendly"
          description="Works perfectly on all devices - desktop, tablet, and mobile."
        />
        <FeatureCard
          icon="🎨"
          title="Beautiful Design"
          description="Modern, intuitive interface that looks great and feels natural."
        />
        <FeatureCard
          icon="🌐"
          title="Share Anywhere"
          description="Easily share polls with your team, audience, or social media."
        />
      </div>

      {/* Stats Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '40px'
        }}>
          Why Choose Our Polling App?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}>
          <StatCard number="10+" label="Poll Options" />
          <StatCard number="∞" label="Unlimited Polls" />
          <StatCard number="0ms" label="Real-time Updates" />
          <StatCard number="100%" label="Mobile Responsive" />
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '64px 0',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '16px'
        }}>
          Ready to Start Polling?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '32px'
        }}>
          Join thousands of users who trust our platform for their polling needs.
        </p>
        <button
          onClick={onGetStarted}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          🎯 Create Your First Poll
        </button>
      </div>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
    }}
    >
      <div style={{
        fontSize: '48px',
        marginBottom: '16px'
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#6b7280',
        lineHeight: '1.5'
      }}>
        {description}
      </p>
    </div>
  )
}

// Stat Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '36px',
        fontWeight: '700',
        color: '#3b82f6',
        marginBottom: '8px'
      }}>
        {number}
      </div>
      <div style={{
        fontSize: '16px',
        color: '#6b7280',
        fontWeight: '500'
      }}>
        {label}
      </div>
    </div>
  )
}
