import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { handleSupabaseError } from '@/lib/error-handler'

// Email sending function (you'll need to set up an email service)
async function sendEmailNotification(questionData: any) {
  // Implement with your preferred email service (Resend, SendGrid, etc.)
  console.log('Sending email notification for question:', questionData.id)
  // This would send to the speaker and/or team
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.username || !body.useremail || !body.eventName || 
        !body.eventDate || !body.speakerName || !body.question) {
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

    // Insert question into database
    const { data, error } = await supabase
      .from('ask_the_speaker')
      .insert([{
        username: body.username,
        useremail: body.useremail,
        event_name: body.eventName,
        event_date: body.eventDate,
        speaker_name: body.speakerName,
        question: body.question,
        question_topic: body.questionTopic || null,
        can_share_publicly: body.canSharePublicly || false,
        is_answered: false
      }])
      .select()

    if (error) {
      const userMessage = handleSupabaseError(error)
      return NextResponse.json(
        { error: userMessage, code: error.code },
        { status: 400 }
      )
    }

    // Send email notification to team/speaker
    await sendEmailNotification(data[0])

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Your question has been submitted! The speaker will answer it during or after the event.'
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch questions for an event
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventName = searchParams.get('event')
    const speakerName = searchParams.get('speaker')
    const showPublic = searchParams.get('public') === 'true'

    let query = supabase
      .from('ask_the_speaker')
      .select('*')
      .order('created_at', { ascending: false })

    if (eventName) {
      query = query.eq('event_name', eventName)
    }

    if (speakerName) {
      query = query.eq('speaker_name', speakerName)
    }

    if (showPublic) {
      query = query.eq('can_share_publicly', true).eq('is_answered', true)
    }

    const { data, error } = await query

    if (error) {
      const userMessage = handleSupabaseError(error)
      return NextResponse.json(
        { error: userMessage, code: error.code },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// PATCH endpoint to answer a question
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, answerText, answeredBy } = body

    if (!id || !answerText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('ask_the_speaker')
      .update({
        answer_text: answerText,
        answered_by: answeredBy || 'team',
        is_answered: true,
        answered_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) {
      const userMessage = handleSupabaseError(error)
      return NextResponse.json(
        { error: userMessage, code: error.code },
        { status: 400 }
      )
    }

    // Send email to user that their question was answered
    // await sendAnswerNotification(data[0])

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Answer submitted successfully'
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}