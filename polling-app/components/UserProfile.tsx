'use client'

import { useState, useEffect, useCallback } from 'react'
import { PollWithOptions } from '../lib/pollService'
import { PollService } from '../lib/pollService'
import { useAuth } from '../lib/authContext'
import PollCard from './PollCard'

export default function UserProfile() {
  const [userPolls, setUserPolls] = useState<PollWithOptions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()



  const loadUserPolls = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const polls = await PollService.getUserPolls(user.id)
      setUserPolls(polls)
    } catch (err) {
      setError('Failed to load your polls. Please try again.')
      console.error('Error loading user polls:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      loadUserPolls()
    }
  }, [user, loadUserPolls])

  const handleVoteUpdate = () => {
    loadUserPolls()
  }

  if (!user) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 0'
      }}>
        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          margin: 0
        }}>Please log in to view your profile.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 0'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <p style={{ color: '#dc2626', margin: '0 0 8px 0', fontSize: '14px' }}>{error}</p>
        <button
          onClick={loadUserPolls}
          style={{
            color: '#dc2626',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: 'underline'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#b91c1c'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#dc2626'
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* User Info */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            {user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 4px 0'
            }}>Profile</h2>
            <p style={{
              color: '#6b7280',
              margin: '0 0 4px 0',
              fontSize: '16px'
            }}>{user.email}</p>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: 0
            }}>
              Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* User's Polls */}
      <div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '16px'
        }}>My Polls</h3>
        
        {userPolls.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 0',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            <div style={{
              color: '#9ca3af',
              marginBottom: '16px',
              fontSize: '48px'
            }}>
              📊
            </div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#1f2937',
              marginBottom: '8px'
            }}>No polls created yet</h4>
            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>Create your first poll to start gathering opinions!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {userPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
                onVoteUpdate={handleVoteUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
