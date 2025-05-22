import {z} from 'zod'

const userSchema = z.object({
    username: z.string().min(3, 'Username is required to be longer than 3 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6,'Password must be at least 6 characters'),
    avatar: z.string().url('Invalid URL').optional()
})

export { userSchema }