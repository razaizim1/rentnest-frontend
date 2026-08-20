"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { singInFrom } from '../_actions/authAction';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const initialState = {
    success: false,
    statusCode: 0,
    message: '',
    data: {
        accessToken: '',
        refreshToken: '',
    },
}

const SignInFrom = () => {
    const [state, action, pending] = useActionState(singInFrom, initialState);

    useEffect(() => {
        if (!state || state.statusCode === 0) {
            return;
        }
        if (state.success) {
            toast.success(state.message);
        }

        if (!state.success) {
            toast.error(state.message);
        }
    }, [state])
    return (
        <form action={action} className="space-y-4">
            <Card className="space-y-4 p-5">
                <Input name="email" type="email" placeholder="Enter your email" required />
                <Input name="password" type="password" placeholder="Enter your password" required />
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Logging in..." : "Login"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                        Register
                    </Link>
                </p>
            </Card>
        </form>
    );
};

export default SignInFrom;
