import { supabase } from './supabaseClient'
import { Poll, PollInsert, PollOption, PollOptionInsert, Vote, VoteInsert } from './database.types'

export interface PollWithOptions extends Poll {
  options: PollOption[]
  total_votes: number
  user_vote?: string
}

export interface PollResult {
  option_id: string
  option_text: string
  vote_count: number
  percentage: number
}

export class PollService {
  // Create a new poll with options
  static async createPoll(
    pollData: Omit<PollInsert, 'id' | 'created_at'>,
    options: string[]
  ): Promise<Poll | null> {
    try {
      // Insert the poll
      const { data: poll, error: pollError } = await supabase
        .from('polls')
        .insert({
          ...pollData,
          created_at: new Date().toISOString(),
          is_active: true
        })
        .select()
        .single()

      if (pollError) {
        console.error('Error creating poll:', pollError)
        throw pollError
      }

      // Insert the options
      const pollOptions: PollOptionInsert[] = options.map(option => ({
        poll_id: poll.id,
        option_text: option
      }))

      const { error: optionsError } = await supabase
        .from('poll_options')
        .insert(pollOptions)

      if (optionsError) {
        console.error('Error creating poll options:', optionsError)
        throw optionsError
      }

      return poll
    } catch (error) {
      console.error('Error creating poll:', error)
      return null
    }
  }

  // Get all active polls
  static async getActivePolls(): Promise<PollWithOptions[]> {
    try {
      console.log('Attempting to fetch polls from database...')
      
      const { data: polls, error } = await supabase
        .from('polls')
        .select(`
          *,
          options:poll_options(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase error fetching polls:', error)
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        throw error
      }

      console.log('Polls fetched successfully:', polls?.length || 0, 'polls found')

      if (!polls || polls.length === 0) {
        console.log('No polls found, returning empty array')
        return []
      }

      // Transform the data to include vote counts
      const pollsWithVotes = await Promise.all(
        polls.map(async (poll) => {
          try {
            const totalVotes = await this.getPollVoteCount(poll.id)
            return {
              ...poll,
              total_votes: totalVotes
            }
          } catch (voteError) {
            console.error('Error getting vote count for poll:', poll.id, voteError)
            return {
              ...poll,
              total_votes: 0
            }
          }
        })
      )

      return pollsWithVotes
    } catch (error) {
      console.error('Error fetching polls:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error: error
      })
      return []
    }
  }

  // Get a specific poll with options and results
  static async getPoll(pollId: string, userId?: string): Promise<PollWithOptions | null> {
    try {
      const { data: poll, error } = await supabase
        .from('polls')
        .select(`
          *,
          options:poll_options(*)
        `)
        .eq('id', pollId)
        .single()

      if (error) {
        console.error('Error fetching specific poll:', error)
        throw error
      }

      const totalVotes = await this.getPollVoteCount(pollId)
      let userVote: string | undefined

      if (userId) {
        userVote = await this.getUserVote(pollId, userId)
      }

      return {
        ...poll,
        total_votes: totalVotes,
        user_vote: userVote
      }
    } catch (error) {
      console.error('Error fetching poll:', error)
      return null
    }
  }

  // Vote on a poll
  static async vote(pollId: string, optionId: string, userId: string): Promise<boolean> {
    try {
      // Check if user already voted on this poll
      const existingVote = await this.getUserVote(pollId, userId)
      
      if (existingVote) {
        // Update existing vote
        const { error } = await supabase
          .from('votes')
          .update({ option_id: optionId })
          .eq('poll_id', pollId)
          .eq('user_id', userId)

        if (error) {
          console.error('Error updating vote:', error)
          throw error
        }
      } else {
        // Create new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            poll_id: pollId,
            option_id: optionId,
            user_id: userId
          })

        if (error) {
          console.error('Error creating vote:', error)
          throw error
        }
      }

      return true
    } catch (error) {
      console.error('Error voting:', error)
      return false
    }
  }

  // Get poll results
  static async getPollResults(pollId: string): Promise<PollResult[]> {
    try {
      const { data: votes, error } = await supabase
        .from('votes')
        .select(`
          option_id,
          poll_options!inner(option_text)
        `)
        .eq('poll_id', pollId)

      if (error) {
        console.error('Error fetching votes for results:', error)
        throw error
      }

      const totalVotes = votes.length
      const optionCounts = new Map<string, number>()

      // Count votes for each option
      votes.forEach(vote => {
        const count = optionCounts.get(vote.option_id) || 0
        optionCounts.set(vote.option_id, count + 1)
      })

      // Get all options for the poll
      const { data: options } = await supabase
        .from('poll_options')
        .select('id, option_text')
        .eq('poll_id', pollId)

      if (!options) return []

      // Calculate results
      const results: PollResult[] = options.map(option => {
        const voteCount = optionCounts.get(option.id) || 0
        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0

        return {
          option_id: option.id,
          option_text: option.option_text,
          vote_count: voteCount,
          percentage: Math.round(percentage * 100) / 100
        }
      })

      return results.sort((a, b) => b.vote_count - a.vote_count)
    } catch (error) {
      console.error('Error getting poll results:', error)
      return []
    }
  }

  // Get user's polls
  static async getUserPolls(userId: string): Promise<PollWithOptions[]> {
    try {
      const { data: polls, error } = await supabase
        .from('polls')
        .select(`
          *,
          options:poll_options(*)
        `)
        .eq('created_by', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user polls:', error)
        throw error
      }

      const pollsWithVotes = await Promise.all(
        polls.map(async (poll) => {
          const totalVotes = await this.getPollVoteCount(poll.id)
          return {
            ...poll,
            total_votes: totalVotes
          }
        })
      )

      return pollsWithVotes
    } catch (error) {
      console.error('Error fetching user polls:', error)
      return []
    }
  }

  // Helper methods
  static async getPollVoteCount(pollId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('poll_id', pollId)

      if (error) {
        console.error('Error getting vote count:', error)
        return 0
      }
      return count || 0
    } catch (error) {
      console.error('Error in getPollVoteCount:', error)
      return 0
    }
  }

  private static async getUserVote(pollId: string, userId: string): Promise<string | undefined> {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('option_id')
        .eq('poll_id', pollId)
        .eq('user_id', userId)
        .single()

      if (error || !data) return undefined
      return data.option_id
    } catch (error) {
      console.error('Error getting user vote:', error)
      return undefined
    }
  }

  // Get poll options for a specific poll
  static async getPollOptions(pollId: string): Promise<PollOption[]> {
    try {
      const { data: options, error } = await supabase
        .from('poll_options')
        .select('*')
        .eq('poll_id', pollId)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching poll options:', error)
        throw error
      }

      return options || []
    } catch (error) {
      console.error('Error getting poll options:', error)
      return []
    }
  }

  // Get user's vote for a specific poll (returns full Vote object)
  static async getUserVoteFull(pollId: string, userId: string): Promise<Vote | null> {
    try {
      const { data: vote, error } = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', pollId)
        .eq('user_id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No vote found
          return null
        }
        console.error('Error fetching user vote:', error)
        throw error
      }

      return vote
    } catch (error) {
      console.error('Error getting user vote:', error)
      return null
    }
  }

  // Get vote count for a specific option
  static async getOptionVoteCount(optionId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('option_id', optionId)

      if (error) {
        console.error('Error counting votes for option:', error)
        throw error
      }

      return count || 0
    } catch (error) {
      console.error('Error getting option vote count:', error)
      return 0
    }
  }
}
