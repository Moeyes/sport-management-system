/**
 * Data Writer Utilities
 * Handles adding, updating, and deleting data in JSON files
 * 
 * Note: In a real Next.js app, these operations would be done via API routes
 * that write to a database or JSON files on the server side.
 * This file provides the client-side interface for those operations.
 */

import type { Athlete, Medal, Sport } from '@/types';

/**
 * Add a new athlete
 * In production, this would call an API route: POST /api/athletes
 */
export async function addAthlete(athleteData: Omit<Athlete, 'id'>): Promise<Athlete> {
  try {
    const response = await fetch('/api/athletes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athleteData),
    });

    if (!response.ok) {
      throw new Error('Failed to add athlete');
    }

    const newAthlete = await response.json();
    return newAthlete;
  } catch (error) {
    console.error('Error adding athlete:', error);
    throw error;
  }
}

/**
 * Update an existing athlete
 */
export async function updateAthlete(id: string, athleteData: Partial<Athlete>): Promise<Athlete> {
  try {
    const response = await fetch(`/api/athletes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athleteData),
    });

    if (!response.ok) {
      throw new Error('Failed to update athlete');
    }

    const updatedAthlete = await response.json();
    return updatedAthlete;
  } catch (error) {
    console.error('Error updating athlete:', error);
    throw error;
  }
}

/**
 * Delete an athlete
 */
export async function deleteAthlete(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/athletes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete athlete');
    }
  } catch (error) {
    console.error('Error deleting athlete:', error);
    throw error;
  }
}

/**
 * Add a new medal
 */
export async function addMedal(medalData: Omit<Medal, 'id'>): Promise<Medal> {
  try {
    const response = await fetch('/api/medals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medalData),
    });

    if (!response.ok) {
      throw new Error('Failed to add medal');
    }

    const newMedal = await response.json();
    return newMedal;
  } catch (error) {
    console.error('Error adding medal:', error);
    throw error;
  }
}

/**
 * Update an existing medal
 */
export async function updateMedal(id: string, medalData: Partial<Medal>): Promise<Medal> {
  try {
    const response = await fetch(`/api/medals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medalData),
    });

    if (!response.ok) {
      throw new Error('Failed to update medal');
    }

    const updatedMedal = await response.json();
    return updatedMedal;
  } catch (error) {
    console.error('Error updating medal:', error);
    throw error;
  }
}

/**
 * Delete a medal
 */
export async function deleteMedal(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/medals/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete medal');
    }
  } catch (error) {
    console.error('Error deleting medal:', error);
    throw error;
  }
}

/**
 * Add a new sport
 */
export async function addSport(sportData: Omit<Sport, 'id'>): Promise<Sport> {
  try {
    const response = await fetch('/api/sports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sportData),
    });

    if (!response.ok) {
      throw new Error('Failed to add sport');
    }

    const newSport = await response.json();
    return newSport;
  } catch (error) {
    console.error('Error adding sport:', error);
    throw error;
  }
}

/**
 * Update an existing sport
 */
export async function updateSport(id: string, sportData: Partial<Sport>): Promise<Sport> {
  try {
    const response = await fetch(`/api/sports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sportData),
    });

    if (!response.ok) {
      throw new Error('Failed to update sport');
    }

    const updatedSport = await response.json();
    return updatedSport;
  } catch (error) {
    console.error('Error updating sport:', error);
    throw error;
  }
}

/**
 * Delete a sport
 */
export async function deleteSport(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/sports/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete sport');
    }
  } catch (error) {
    console.error('Error deleting sport:', error);
    throw error;
  }
}
