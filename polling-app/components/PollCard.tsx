'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PollWithOptions, PollResult } from '../lib/pollService'
import { PollService } from '../lib/pollService'
import { useAuth } from '../lib/authContext'

interface PollCardProps {
  poll: PollWithOptions
  onVoteUpdate: () => void
}

export default function PollCard({ poll, onVoteUpdate }: PollCardProps) {
  const router = useRouter()
  const [results, setResults] = useState<PollResult[]>([])
  const [selectedOption, setSelectedOption] = useState<string | undefined>(poll.user_vote)
  const [isVoting, setIsVoting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { user } = useAuth()



  const loadResults = useCallback(async () => {
    const pollResults = await PollService.getPollResults(poll.id)
    setResults(pollResults)
  }, [poll.id])

  useEffect(() => {
    if (showResults) {
      loadResults()
    }
  }, [showResults, poll.id, loadResults])

  const handleVote = async (optionId: string) => {
    if (!user || isVoting) return

    setIsVoting(true)
    try {
      const success = await PollService.vote(poll.id, optionId, user.id)
      if (success) {
        setSelectedOption(optionId)
        onVoteUpdate()
        if (showResults) {
          loadResults()
        }
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setIsVoting(false)
    }
  }

  const toggleResults = () => {
    setShowResults(!showResults)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '24px',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>{poll.title}</h3>
        {poll.description && (
          <p style={{
            color: '#374151',
            marginBottom: '16px',
            lineHeight: '1.6',
            fontSize: '16px',
            fontWeight: '500'
          }}>{poll.description}</p>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#6b7280',
          fontWeight: '500',
          marginBottom: '16px'
        }}>
          <span>Created {formatDate(poll.created_at)}</span>
          <span>{poll.total_votes} votes</span>
        </div>

        <button
          onClick={() => router.push(`/polls/${poll.id}`)}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '20px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb'
            e.currentTarget.style.borderColor = '#9ca3af'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6'
            e.currentTarget.style.borderColor = '#d1d5db'
          }}
        >
          👁️ View Details
        </button>
      </div>

      {!showResults ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {poll.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={isVoting || !user}
              style={{
                width: '100%',
                padding: '16px',
                textAlign: 'left',
                borderRadius: '8px',
                border: `2px solid ${selectedOption === option.id ? '#3b82f6' : '#e5e7eb'}`,
                backgroundColor: selectedOption === option.id ? '#eff6ff' : 'white',
                color: selectedOption === option.id ? '#1e40af' : '#111827',
                cursor: user && !isVoting ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                fontSize: '16px',
                fontWeight: '600',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (user && !isVoting) {
                  e.currentTarget.style.borderColor = selectedOption === option.id ? '#3b82f6' : '#d1d5db'
                  e.currentTarget.style.backgroundColor = selectedOption === option.id ? '#eff6ff' : '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = selectedOption === option.id ? '#3b82f6' : '#e5e7eb'
                e.currentTarget.style.backgroundColor = selectedOption === option.id ? '#eff6ff' : 'white'
              }}
            >
              <span style={{ fontWeight: '600' }}>{option.option_text}</span>
            </button>
          ))}
          
          {!user && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              textAlign: 'center',
              marginTop: '12px',
              fontStyle: 'italic',
              fontWeight: '500'
            }}>
              Please log in to vote
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((result) => (
            <div key={result.option_id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontWeight: '600',
                  color: '#111827',
                  fontSize: '16px'
                }}>
                  {result.option_text}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  {result.vote_count} votes ({result.percentage}%)
                </span>
              </div>
              <div style={{
                width: '100%',
                backgroundColor: '#e5e7eb',
                borderRadius: '9999px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    backgroundColor: '#3b82f6',
                    height: '100%',
                    borderRadius: '9999px',
                    width: `${result.percentage}%`,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <button
          onClick={toggleResults}
          style={{
            color: '#3b82f6',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#eff6ff'
            e.currentTarget.style.color = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#3b82f6'
          }}
        >
          {showResults ? 'Hide Results' : 'Show Results'}
        </button>
        
        {poll.created_by === user?.id && (
          <span style={{
            fontSize: '12px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '4px 8px',
            borderRadius: '9999px',
            fontWeight: '600'
          }}>
            Your Poll
          </span>
        )}
      </div>
    </div>
  )
}
