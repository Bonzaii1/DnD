/**
 * Application-wide constants
 */

// Event & Registration
export const ACTIVE_EVENT_ID = 6
export const CURRENT_YEAR = 2026

// User Status
export const USER_ACTIVE_STATUS = 1
export const USER_INACTIVE_STATUS = 0

// Certification Type IDs
export const CERTIFICATION_IDS = {
  // Drill Certifications
  DRILL_MASTER: 9,
  COLOR_GUARD: 10,
  DRILL_LEADERSHIP_11: 11,
  DRILL_LEADERSHIP_12: 12,
  DRILL_LEADERSHIP_13: 13,
  
  // Drum Certifications
  DRUM_BEGINNER: 14,
  DRUM_INTERMEDIATE: 15,
  DRUM_ADVANCED: 16,
  TXDC: 17
} as const

// Certification Groups for easier checks
export const DRILL_CERTIFICATIONS = [
  CERTIFICATION_IDS.DRILL_MASTER,
  CERTIFICATION_IDS.COLOR_GUARD,
  CERTIFICATION_IDS.DRILL_LEADERSHIP_11,
  CERTIFICATION_IDS.DRILL_LEADERSHIP_12,
  CERTIFICATION_IDS.DRILL_LEADERSHIP_13
]

export const DRUM_CERTIFICATIONS = [
  CERTIFICATION_IDS.DRUM_BEGINNER,
  CERTIFICATION_IDS.DRUM_INTERMEDIATE,
  CERTIFICATION_IDS.DRUM_ADVANCED,
  CERTIFICATION_IDS.TXDC
]

// Helper functions for type-safe certification checks
export const isDrillCertification = (certificationId: string | number): boolean => {
  const id = typeof certificationId === 'string' ? Number(certificationId) : certificationId
  return DRILL_CERTIFICATIONS.includes(id as any)
}

export const isDrumCertification = (certificationId: string | number): boolean => {
  const id = typeof certificationId === 'string' ? Number(certificationId) : certificationId
  return DRUM_CERTIFICATIONS.includes(id as any)
}

// User Levels/Roles
export const USER_LEVELS = [
  "Pathfinder",
  "TLT",
  "Master Guide Candidate",
  "Invested Master Guide",
  "Staff / Volunteer",
  "Parent"
] as const

export type UserLevel = typeof USER_LEVELS[number]
