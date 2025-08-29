'use client'

import { useState } from 'react'
import { useAuth } from '../lib/authContext'

interface NavigationProps {
  activeTab: 'home' | 'polls' | 'create' | 'profile'
  onTabChange: (tab: 'home' | 'polls' | 'create' | 'profile') => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { user, signOut } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0,
              cursor: 'pointer'
            }}
            onClick={() => onTabChange('home')}
            >
              🗳️ Polling App
            </h1>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}>
            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => onTabChange('home')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeTab === 'home' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'home' ? '#1e40af' : '#6b7280'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'home') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'home') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                  }
                }}
              >
                🏠 Home
              </button>
              <button
                onClick={() => onTabChange('polls')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeTab === 'polls' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'polls' ? '#1e40af' : '#6b7280'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'polls') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'polls') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                  }
                }}
              >
                📊 Polls
              </button>
              <button
                onClick={() => onTabChange('create')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: activeTab === 'create' ? '#dbeafe' : 'transparent',
                  color: activeTab === 'create' ? '#1e40af' : '#6b7280'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'create') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.color = '#374151'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'create') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6b7280'
                  }
                }}
              >
                ✨ Create Poll
              </button>

            </div>

            {/* User Profile */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    color: '#374151',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}>
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span style={{
                    display: 'none'
                  }}>{user.email}</span>
                </button>

                {isProfileOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '8px',
                    width: '192px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '4px 0',
                    zIndex: 10,
                    border: '1px solid #e5e7eb'
                  }}>
                    <button
                      onClick={() => {
                        onTabChange('profile')
                        setIsProfileOpen(false)
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        fontSize: '14px',
                        color: '#374151',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      👤 My Polls
                    </button>
                    <button
                      onClick={handleSignOut}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        fontSize: '14px',
                        color: '#374151',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <a
                  href="/auth/login"
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#374151'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6b7280'
                  }}
                >
                  🔑 Login
                </a>
                <a
                  href="/auth/register"
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  ✨ Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
