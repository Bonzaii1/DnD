/**
 * Zod validation schema for the SignUp form.
 * 
 * Validates user profile information during the signup process.
 * Ensures required fields are filled and data formats are correct.
 * 
 * @module schemas/signUpSchema
 */

import { z } from 'zod'

/**
 * Validation schema for user signup form.
 * 
 * **Validation Rules:**
 * - `fname`: Required, non-empty string
 * - `lname`: Required, non-empty string
 * - `email`: Must be valid email format
 * - `phone_number`: Optional, must match format ###-###-#### if provided
 * - `date_of_birth`: Required, must be in the past (not future date)
 * - `role`: Required, user's level/role selection
 * - `areaId`: Required, numeric area ID (min 1)
 * - `churchId`: Required, numeric church ID (min 1)
 * 
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { signUpSchema } from '@/schemas/signUpSchema'
 * 
 * const { register, handleSubmit, formState: { errors } } = useForm({
 *   resolver: zodResolver(signUpSchema)
 * })
 * ```
 */
export const signUpSchema = z.object({
  fname: z.string().min(1, 'First name is required'),
  lname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in format: ###-###-####')
    .optional()
    .or(z.literal('')),
  date_of_birth: z.string().refine((date) => {
    if (!date) return false
    const dob = new Date(date)
    const today = new Date()
    return dob < today
  }, 'Date of birth cannot be in the future'),
  role: z.string().min(1, 'Level/Role is required'),
  areaId: z.number().min(1, 'Area selection is required'),
  churchId: z.number().min(1, 'Church selection is required')
})

/**
 * TypeScript type inferred from signUpSchema.
 * 
 * Use this type for form data when working with the signup form.
 * 
 * @typedef SignUpFormData
 */
export type SignUpFormData = z.infer<typeof signUpSchema>
