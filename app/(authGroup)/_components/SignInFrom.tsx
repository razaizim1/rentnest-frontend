"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { singInFrom } from '../_actions/authAction';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';


const SignInFrom = () => {
    const [state, action, pending] = useActionState(singInFrom, false);

    useEffect(() => {
        if (!state) {
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
                <Input name="email" type="email" placeholder="Enter your email" required></Input>
                <Input name="password" type="password" placeholder="Enter your password" required></Input>
                <Button type="submit">{
                    pending ? "Logging in..." : "Login"
                }</Button>
            </Card>
        </form>
    );
};

export default SignInFrom;