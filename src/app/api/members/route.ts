import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { handleSupabaseError } from '@/lib/error-handler'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('members')
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          student_id: body.studentId || null,
          major: body.major || null,
          academic_year: body.year || null,
          career_interests: body.interests || null,
          member_type: body.memberType || 'active',
          skills: body.skills || null,
          motivation: body.motivation || null
        }
      ])
      .select()

    if (error) {
      // Use our error handler for user-friendly messages
      const userMessage = handleSupabaseError(error)
      return NextResponse.json(
        { error: userMessage, code: error.code },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Application submitted successfully'
    })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}