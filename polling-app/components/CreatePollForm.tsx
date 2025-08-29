'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PollService } from '../lib/pollService'
import { useAuth } from '../lib/authContext'

const createPollSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  options: z.array(z.string().min(1, 'Option text is required')).min(2, 'At least 2 options are required').max(10, 'Maximum 10 options allowed')
})

type CreatePollFormData = z.infer<typeof createPollSchema>

interface CreatePollFormProps {
  onPollCreated: () => void
}

export default function CreatePollForm({ onPollCreated }: CreatePollFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [options, setOptions] = useState(['', ''])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { user, loading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreatePollFormData>({
    resolver: zodResolver(createPollSchema)
  })

  const addOption = () => {
    if (options.length < 10) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const onSubmit = async (data: CreatePollFormData) => {
    console.log('Form submitted with data:', data)
    console.log('Current options:', options)
    console.log('Current user:', user)
    
    if (!user) {
      setError('You must be logged in to create polls')
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    
    try {
      const pollData = {
        title: data.title,
        description: data.description || null,
        created_by: user.id
      }

      const filteredOptions = options.filter(option => option.trim() !== '')
      console.log('Filtered options:', filteredOptions)
      
      if (filteredOptions.length < 2) {
        setError('At least 2 options are required')
        setIsSubmitting(false)
        return
      }

      console.log('Calling PollService.createPoll with:', pollData, filteredOptions)
      const poll = await PollService.createPoll(pollData, filteredOptions)
      
      if (poll) {
        console.log('Poll created successfully:', poll)
        setSuccess('Poll created successfully! Redirecting to polls...')
        reset()
        setOptions(['', ''])
        setTimeout(() => {
          onPollCreated()
        }, 2000)
      } else {
        setError('Failed to create poll. Please try again.')
      }
    } catch (error) {
      console.error('Error creating poll:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px auto'
        }}></div>
        <p style={{ color: '#6b7280', margin: 0 }}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (!user) {
    return (
      <div style={{
        backgroundColor: '#fef3c7',
        border: '1px solid #f59e0b',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h3 style={{ color: '#92400e', margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>
          Authentication Required
        </h3>
        <p style={{ color: '#92400e', margin: '0 0 24px 0', fontSize: '16px', lineHeight: '1.5' }}>
          You need to be logged in to create polls. Please sign in or create an account to continue.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/auth/login"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
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
            🔑 Sign In
          </a>
          <a
            href="/auth/register"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#059669'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ✨ Sign Up
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '24px',
        textAlign: 'center'
      }}>Create New Poll</h2>
      
      {/* Error Display */}
      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>🚨</span>
          <p style={{ color: '#dc2626', margin: 0, fontSize: '14px', fontWeight: '500' }}>
            {error}
          </p>
        </div>
      )}

      {/* Success Display */}
      {success && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '20px' }}>🎉</span>
          <p style={{ color: '#166534', margin: 0, fontSize: '14px', fontWeight: '500' }}>
            {success}
          </p>
        </div>
      )}

      {/* Debug Info */}
      <div style={{
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        fontSize: '14px',
        color: '#374151'
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Debug Info:</p>
        <p style={{ margin: '4px 0', fontSize: '12px' }}>User ID: {user?.id || 'Not available'}</p>
        <p style={{ margin: '4px 0', fontSize: '12px' }}>Email: {user?.email || 'Not available'}</p>
        <p style={{ margin: '4px 0', fontSize: '12px' }}>Options Count: {options.filter(o => o.trim() !== '').length}</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label htmlFor="title" style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Poll Title *
          </label>
          <input
            {...register('title')}
            type="text"
            id="title"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              outline: 'none',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
              color: '#111827',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            placeholder="What would you like to ask?"
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6'
              e.target.style.backgroundColor = '#ffffff'
              e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.backgroundColor = '#ffffff'
              e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          />
          {errors.title && (
            <p style={{ 
              color: '#dc2626', 
              fontSize: '14px', 
              marginTop: '8px', 
              margin: '8px 0 0 0',
              fontWeight: '600'
            }}>
              ⚠️ {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Description (Optional)
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              outline: 'none',
              resize: 'vertical',
              transition: 'all 0.2s ease',
              backgroundColor: '#ffffff',
              color: '#111827',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            placeholder="Add more context about your poll..."
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6'
              e.target.style.backgroundColor = '#ffffff'
              e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db'
              e.target.style.backgroundColor = '#ffffff'
              e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          />
          {errors.description && (
            <p style={{ 
              color: '#dc2626', 
              fontSize: '14px', 
              marginTop: '8px', 
              margin: '8px 0 0 0',
              fontWeight: '600'
            }}>
              ⚠️ {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Poll Options *
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((option, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    border: '2px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#ffffff',
                    color: '#111827',
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  placeholder={`Option ${index + 1}`}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6'
                    e.target.style.backgroundColor = '#ffffff'
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.backgroundColor = '#ffffff'
                    e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    style={{
                      padding: '12px 16px',
                      color: '#dc2626',
                      background: 'none',
                      border: '2px solid #dc2626',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#dc2626'
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          {options.length < 10 && (
            <button
              type="button"
              onClick={addOption}
              style={{
                marginTop: '12px',
                padding: '12px 20px',
                color: '#3b82f6',
                background: 'none',
                border: '2px solid #3b82f6',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#3b82f6'
              }}
            >
              + Add Option
            </button>
          )}
          <p style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#6b7280',
            margin: '8px 0 0 0'
          }}>
            {options.filter(o => o.trim() !== '').length}/10 options
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '18px 24px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#2563eb'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#3b82f6'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          {isSubmitting ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Creating Poll...
            </>
          ) : (
            <>
              🚀 Create Poll
            </>
          )}
        </button>
      </form>
    </div>
  )
}
