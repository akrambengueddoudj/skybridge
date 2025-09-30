export class AppError extends Error {
  constructor(
    message: string,
    public userMessage: string,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleSupabaseError(error: any): string {
  console.error('Supabase error:', error)

  // Handle specific Supabase error codes
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique violation
        if (error.message.includes('email')) {
          return 'This email is already registered. Please use a different email address or contact us if you think this is a mistake.'
        }
        return 'This information appears to be already registered. Please check your details and try again.'
      
      case '23503': // Foreign key violation
        return 'There was an issue with your submission. Please check the information and try again.'
      
      case '23502': // Not null violation
        return 'Please fill in all required fields.'
      
      case '22P02': // Invalid input syntax
        return 'Invalid information provided. Please check your inputs and try again.'
      
      case '42703': // Undefined column
        return 'System error: Please refresh the page and try again.'
      
      default:
        return 'There was an issue with your submission. Please try again.'
    }
  }

  // Handle network/connection errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return 'Network error: Please check your internet connection and try again.'
  }

  // Handle timeout errors
  if (error.message?.includes('timeout')) {
    return 'Request timeout: Please try again in a moment.'
  }

  // Default user-friendly message
  return 'Something went wrong. Please try again or contact us if the problem persists.'
}