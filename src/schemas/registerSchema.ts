/**
 * Zod validation schema for the Registration form.
 * 
 * Validates event registration data including past event participation
 * and certification selections.
 * 
 * @module schemas/registerSchema
 */

import { z } from 'zod'

/**
 * Validation schema for event registration form.
 * 
 * **Validation Rules:**
 * - `pastEvents`: Optional array of event IDs user has attended
 * - `certificationOption`: Required, selected certification ID
 * - `drumEquipmentCheck`: Optional boolean for drum equipment confirmation
 * - `drumRequirementCheck`: Optional boolean for drum requirements acknowledgment
 * 
 * @remarks
 * Drum-specific fields are conditionally validated in the component based on
 * whether user selected a drum certification (IDs 14-17).
 * 
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { registerSchema } from '@/schemas/registerSchema'
 * 
 * const { register, handleSubmit } = useForm({
 *   resolver: zodResolver(registerSchema)
 * })
 * ```
 */
export const registerSchema = z.object({
  pastEvents: z.array(z.number()).optional(),
  certificationOption: z.string().min(1, 'Please select a certification'),
  
  // Drum-specific fields (conditional validation handled in component)
  drumEquipmentCheck: z.boolean().optional(),
  drumRequirementCheck: z.boolean().optional()
})

/**
 * TypeScript type inferred from registerSchema.
 * 
 * Use this type for form data when working with the registration form.
 * 
 * @typedef RegisterFormData
 */
export type RegisterFormData = z.infer<typeof registerSchema>
