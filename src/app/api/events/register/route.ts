import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    if (!body.eventId || !body.firstName || !body.lastName || !body.email || !body.phoneNumber || !body.academicYear || !body.fieldOfStudy || !body.experienceLevel) {
      console.log('Missing required fields:', {
        eventId: body.eventId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        academicYear: body.academicYear,
        fieldOfStudy: body.fieldOfStudy,
        experienceLevel: body.experienceLevel
      })
      return NextResponse.json(
        { error: 'All required fields must be filled: First Name, Last Name, Email, Phone Number, Academic Year, Field of Study, and Experience Level' },
        { status: 400 }
      )
    }

    // Check if already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', body.eventId)
      .eq('email', body.email)
      .single()

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      )
    }

    // Insert registration
    const { data, error } = await supabase
      .from('event_registrations')
      .insert([
        {
          event_id: body.eventId,
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone_number: body.phoneNumber,
          academic_year: body.academicYear,
          field_of_study: body.fieldOfStudy,
          experience_level: body.experienceLevel,
          motivation: body.motivation || null
        }
      ])
      .select()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Failed to register for event. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      data: data[0],
      message: 'Successfully registered for the event!'
    })

  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Get registrations count for an event
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      )
    }

    const { count, error } = await supabase
      .from('event_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)

    if (error) {
      console.error('Count error:', error)
      return NextResponse.json(
        { error: 'Failed to get registration count' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      count: count || 0 
    })

  } catch (error) {
    console.error('Count API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}