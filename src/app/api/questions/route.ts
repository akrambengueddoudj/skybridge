import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { handleSupabaseError } from '@/lib/error-handler'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.username || !body.useremail || !body.eventName || !body.eventDate || !body.responseType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.useremail)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate all 20 answers are present
    for (let i = 1; i <= 20; i++) {
      if (!body[`answer${i}`]) {
        return NextResponse.json(
          { error: `Answer ${i} is required` },
          { status: 400 }
        )
      }
    }

    const { responseType } = body // 'pre' or 'post'

    // Always insert a new row, don't update existing ones
    const { error: insertError } = await supabase
      .from('event_responses')
      .insert([{
        username: body.username,
        useremail: body.useremail,
        event_name: body.eventName,
        event_date: body.eventDate,
        // Set the appropriate fields based on response type
        ...(responseType === 'pre' ? {
          answer1_pre: body.answer1,
          answer2_pre: body.answer2,
          answer3_pre: body.answer3,
          answer4_pre: body.answer4,
          answer5_pre: body.answer5,
          answer6_pre: body.answer6,
          answer7_pre: body.answer7,
          answer8_pre: body.answer8,
          answer9_pre: body.answer9,
          answer10_pre: body.answer10,
          answer11_pre: body.answer11,
          answer12_pre: body.answer12,
          answer13_pre: body.answer13,
          answer14_pre: body.answer14,
          answer15_pre: body.answer15,
          answer16_pre: body.answer16,
          answer17_pre: body.answer17,
          answer18_pre: body.answer18,
          answer19_pre: body.answer19,
          answer20_pre: body.answer20,
          has_pre: true,
          submitted_pre_at: new Date().toISOString()
        } : {
          answer1_post: body.answer1,
          answer2_post: body.answer2,
          answer3_post: body.answer3,
          answer4_post: body.answer4,
          answer5_post: body.answer5,
          answer6_post: body.answer6,
          answer7_post: body.answer7,
          answer8_post: body.answer8,
          answer9_post: body.answer9,
          answer10_post: body.answer10,
          answer11_post: body.answer11,
          answer12_post: body.answer12,
          answer13_post: body.answer13,
          answer14_post: body.answer14,
          answer15_post: body.answer15,
          answer16_post: body.answer16,
          answer17_post: body.answer17,
          answer18_post: body.answer18,
          answer19_post: body.answer19,
          answer20_post: body.answer20,
          has_post: true,
          submitted_post_at: new Date().toISOString()
        })
      }])

    if (insertError) {
      const userMessage = handleSupabaseError(insertError)
      return NextResponse.json(
        { error: userMessage, code: insertError.code },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: responseType === 'pre' 
        ? 'Pre-event answers submitted successfully! You\'ll receive the same questions after the event to see your progress.'
        : 'Post-event answers submitted successfully! We\'ll compare your answers and showcase your learning journey soon.'
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}