import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
const locations = new Map<string, { lat: number; lng: number; timestamp: number; userId: string }>();

// GET: Fetch all user locations
export async function GET() {
  try {
    const activeLocations = Array.from(locations.values()).filter(
      (loc) => Date.now() - loc.timestamp < 5 * 60 * 1000 // Keep locations for 5 minutes
    );

    return NextResponse.json(activeLocations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

// POST: Update user location
export async function POST(request: NextRequest) {
  try {
    const { lat, lng, userId } = await request.json();

    if (typeof lat !== 'number' || typeof lng !== 'number' || !userId) {
      return NextResponse.json({ error: 'Invalid location data' }, { status: 400 });
    }

    locations.set(userId, {
      lat,
      lng,
      timestamp: Date.now(),
      userId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
  }
}
