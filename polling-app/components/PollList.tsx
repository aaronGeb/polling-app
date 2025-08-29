'use client'

import { useState, useEffect } from 'react'
import { PollWithOptions } from '../lib/pollService'
import { PollService } from '../lib/pollService'
import PollCard from './PollCard'

export default function PollList() {
  const [polls, setPolls] = useState<PollWithOptions[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPolls()
  }, [])

  const loadPolls = async () => {
    try {
      setLoading(true)
      setError(null)
      const activePolls = await PollService.getActivePolls()
      setPolls(activePolls)
    } catch (err) {
      setError('Failed to load polls. Please try again.')
      console.error('Error loading polls:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleVoteUpdate = () => {
    // Refresh the polls list to show updated vote counts
    loadPolls()
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
          onClick={loadPolls}
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

  if (polls.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '48px 0'
      }}>
        <div style={{
          color: '#9ca3af',
          marginBottom: '16px',
          fontSize: '48px'
        }}>
          📊
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '8px'
        }}>No polls yet</h3>
        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>Be the first to create a poll and start gathering opinions!</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {polls.map((poll) => (
        <PollCard
          key={poll.id}
          poll={poll}
          onVoteUpdate={handleVoteUpdate}
        />
      ))}
    </div>
  )
}
