"use client";

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import Heading from "@/components/heading"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Heading
                title='Conversation'
                description="Our advanced conversation model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm
                            grid grid-cols-2 gap-2'>
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                disabled={isLoading}
                                                placeholder='Size of planet Mars?'
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default ConversationPage