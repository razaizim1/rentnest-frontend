"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useActionState, useEffect, useState } from 'react'
import { registerForm } from '../_actions/authAction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const initialState = {
    success: false,
    statusCode: 0,
    message: '',
    data: {
        name: '',
        email: '',
        phone: '',
        avatar: '',
        role: '',
        status: '',
        createdAt: '',
    },
}

export const RegistrationForm = () => {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(registerForm, initialState)
    const [role, setRole] = useState('TENANT')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        if (state.statusCode === 0) return;

        if (state.success && state.message) {
            toast.success(state.message)
            router.push('/login')
        } else if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, router])

    return (
        <form
            action={formAction}
            className="space-y-4"
            onSubmit={(event) => {
                const form = event.currentTarget
                const password = new FormData(form).get('password')?.toString() || ''
                if (password.length < 6) {
                    event.preventDefault()
                    setPasswordError('Password must be at least 6 characters.')
                    return
                }
                setPasswordError('')
            }}
        >
            <Card className="space-y-4 p-5">
                <Input name="name" type="text" placeholder="Enter your name" required />
                <Input name="email" type="email" placeholder="Enter your email" required />
                <div className="space-y-1">
                    <Input name="password" type="password" placeholder="Enter your password" required minLength={6} />
                    {passwordError && (
                        <p className="text-sm text-destructive">{passwordError}</p>
                    )}
                </div>
                <Input name="phone" type="text" placeholder="Enter your phone" />
                <Input name="avatar" type="url" placeholder="Avatar image URL (optional)" />
                <input type="hidden" name="role" value={role} />
                <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="TENANT">Tenant</SelectItem>
                        <SelectItem value="LANDLORD">Landlord</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? 'Registering...' : 'Register'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </form>
    )
}
