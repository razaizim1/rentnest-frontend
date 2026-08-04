"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { SelectValue } from 'radix-ui/select'
import { useActionState, useEffect, useState } from 'react'
import { registerForm } from '../_actions/authAction'
import { toast } from 'sonner'


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
    const [state, formAction, isPending] = useActionState(registerForm, initialState)
    const [role, setRole] = useState('TENANT')

    useEffect(() => {
        if (state.statusCode === 0) return;

        if (state.success && state.message) {
            toast.success(state.message)
        } else if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state])

    return (
        <form action={formAction} className="space-y-4">
            <Card className="space-y-4 p-5">
                <Input name="name" type="text" placeholder="Enter your name" required></Input>
                <Input name="email" type="email" placeholder="Enter your email" required></Input>
                <Input name="password" type="password" placeholder="Enter your password" required></Input>
                <Input name="phone" type="text" placeholder="Enter your phone"></Input>
                <Input name="avatar" type="text" placeholder="Enter your avatar"></Input>
                {/* Hidden input to actually submit the role in FormData */}
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
            </Card>
        </form>
    )
}
