'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '../../../lib/authContext'
import { PollService } from '../../../lib/pollService'
import type { Poll, PollOption, Vote } from '../../../lib/database.types'

export default function PollDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [poll, setPoll] = useState<Poll | null>(null)
  const [options, setOptions] = useState<PollOption[]>([])
  const [userVote, setUserVote] = useState<Vote | null>(null)
  const [voteCounts, setVoteCounts] = useState<Map<string, number>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVoting, setIsVoting] = useState(false)
  const [showVotingForm, setShowVotingForm] = useState(true)
  const [showThankYou, setShowThankYou] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string>('')

  const pollId = params.id as string

  useEffect(() => {
    if (pollId) {
      loadPollDetails()
    }
  }, [pollId])

  const loadPollDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Load poll details
      const pollData = await PollService.getPoll(pollId)
      if (!pollData) {
        setError('Poll not found')
        return
      }
      setPoll(pollData)

      // Load poll options
      const optionsData = await PollService.getPollOptions(pollId)
      setOptions(optionsData)

      // Load vote counts for all options
      const voteCountsMap = new Map<string, number>()
      for (const option of optionsData) {
        const count = await PollService.getOptionVoteCount(option.id)
        voteCountsMap.set(option.id, count)
      }
      setVoteCounts(voteCountsMap)

      // Load user's vote if logged in
      if (user) {
        const voteData = await PollService.getUserVoteFull(pollId, user.id)
        setUserVote(voteData)
        
        // If user has already voted, show thank you message
        if (voteData) {
          setShowVotingForm(false)
          setShowThankYou(true)
          setSelectedOptionId(voteData.option_id)
        }
      }
    } catch (err) {
      console.error('Error loading poll details:', err)
      setError('Failed to load poll details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (optionId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login')
      return
    }

    try {
      setIsVoting(true)
      await PollService.vote(pollId, optionId, user.id)
      
      // Update local state
      setUserVote({ id: 'temp', poll_id: pollId, option_id: optionId, user_id: user.id, created_at: new Date().toISOString() })
      setSelectedOptionId(optionId)
      
      // Show thank you message
      setShowVotingForm(false)
      setShowThankYou(true)
      
      // Reload poll details to get updated results
      await loadPollDetails()
    } catch (err) {
      console.error('Error voting:', err)
      setError('Failed to submit vote')
    } finally {
      setIsVoting(false)
    }
  }

  const handleVoteSubmit = async () => {
    if (!selectedOptionId || !user) return
    
    try {
      setIsVoting(true)
      await PollService.vote(pollId, selectedOptionId, user.id)
      
      // Update local state
      setUserVote({ id: 'temp', poll_id: pollId, option_id: selectedOptionId, user_id: user.id, created_at: new Date().toISOString() })
      
      // Show thank you message
      setShowVotingForm(false)
      setShowThankYou(true)
      
      // Reload poll details to get updated results
      await loadPollDetails()
    } catch (err) {
      console.error('Error voting:', err)
      setError('Failed to submit vote')
    } finally {
      setIsVoting(false)
    }
  }

  const handleChangeVote = () => {
    setShowVotingForm(true)
    setShowThankYou(false)
    setSelectedOptionId('')
  }

  const getOptionVoteCount = (optionId: string): number => {
    return voteCounts.get(optionId) || 0
  }

  const getOptionPercentage = (optionId: string) => {
    if (!poll) return 0
    const totalVotes = options.reduce((sum, option) => sum + getOptionVoteCount(option.id), 0)
    if (totalVotes === 0) return 0
    return Math.round((getOptionVoteCount(optionId) / totalVotes) * 100)
  }

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error || !poll) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '64px 16px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#ef4444',
          marginBottom: '16px'
        }}>
          {error || 'Poll not found'}
        </h2>
        <button
          onClick={() => router.push('/')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6'
          }}
        >
          ← Back to Home
        </button>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '32px 16px'
    }}>
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'transparent',
          color: '#6b7280',
          border: 'none',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          padding: '8px 0',
          marginBottom: '32px',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#374151'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6b7280'
        }}
      >
        ← Back to Polls
      </button>

      {/* Poll Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '16px',
          lineHeight: '1.3'
        }}>
          {poll.title}
        </h1>
        
        {poll.description && (
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            {poll.description}
          </p>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '14px',
          color: '#9ca3af'
        }}>
          <span>Created {new Date(poll.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{Array.from(voteCounts.values()).reduce((sum, count) => sum + count, 0)} total votes</span>
        </div>
      </div>

      {/* Voting Form and Results */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* Voting Form */}
        {showVotingForm && user && (
          <>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '24px'
            }}>
              Choose your answer:
            </h2>

            <form onSubmit={(e) => { e.preventDefault(); handleVoteSubmit(); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {options.map((option) => (
                  <label
                    key={option.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      border: `2px solid ${selectedOptionId === option.id ? '#3b82f6' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: selectedOptionId === option.id ? '#eff6ff' : 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedOptionId !== option.id) {
                        e.currentTarget.style.borderColor = '#d1d5db'
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedOptionId !== option.id) {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.backgroundColor = 'white'
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name="pollOption"
                      value={option.id}
                      checked={selectedOptionId === option.id}
                      onChange={(e) => setSelectedOptionId(e.target.value)}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: '#3b82f6'
                      }}
                    />
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#1f2937',
                      flex: 1
                    }}>
                      {option.option_text}
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={!selectedOptionId || isVoting}
                style={{
                  backgroundColor: selectedOptionId ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: selectedOptionId ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  if (selectedOptionId) {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOptionId) {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                  }
                }}
              >
                {isVoting ? 'Submitting Vote...' : 'Submit Vote'}
              </button>
            </form>
          </>
        )}

        {/* Thank You Message */}
        {showThankYou && user && (
          <div style={{
            textAlign: 'center',
            padding: '32px 16px'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '16px'
            }}>
              🎉
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#059669',
              marginBottom: '12px'
            }}>
              Thank you for voting!
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Your vote has been recorded. You can see the current results below.
            </p>
            <button
              onClick={handleChangeVote}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
              Change My Vote
            </button>
          </div>
        )}

        {/* Results Display */}
        <div style={{ marginTop: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Current Results
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((option) => {
              const isSelected = userVote?.option_id === option.id
              const voteCount = getOptionVoteCount(option.id)
              const percentage = getOptionPercentage(option.id)
              const totalVotes = Array.from(voteCounts.values()).reduce((sum, count) => sum + count, 0)

              return (
                <div
                  key={option.id}
                  style={{
                    border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: isSelected ? '#eff6ff' : 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Progress Bar Background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#f3f4f6',
                    zIndex: 0
                  }} />

                  {/* Progress Bar Fill */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: '#dbeafe',
                    zIndex: 1,
                    transition: 'width 0.3s ease'
                  }} />

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#1f2937'
                      }}>
                        {option.option_text}
                      </span>
                      
                      {isSelected && (
                        <span style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          Your Vote
                        </span>
                      )}
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <span>{voteCount} votes</span>
                      <span style={{
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {!user && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #f59e0b',
            textAlign: 'center'
          }}>
            <p style={{
              margin: 0,
              color: '#92400e',
              fontSize: '14px'
            }}>
              🔑 Please log in to vote on this poll
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              <a
                href="/auth/login"
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                }}
              >
                Login
              </a>
              <a
                href="/auth/register"
                style={{
                  backgroundColor: 'white',
                  color: '#3b82f6',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  border: '1px solid #3b82f6',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                }}
              >
                Register
              </a>
            </div>
          </div>
        )}

        {isVoting && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#f0f9ff',
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #0ea5e9',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span style={{ color: '#0c4a6e', fontSize: '14px' }}>
              Submitting your vote...
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
