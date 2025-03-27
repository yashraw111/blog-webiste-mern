import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouterSignIn } from '@/helpers/RouteName'

const Signup = () => {
  const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 character long.'),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 character long'),
    confirmPassword: z.string().refine(data => data.password === data.confirmPassword, 'Password and confirm password should be same.')
})

const form = useForm({
    resolver: zodResolver (formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
})

async function onSubmit(values) {
  
}
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
    <Card className="w-[400px] p-5">
        <h1 className='text-2xl font-bold text-center mb-5'>Create Your Account</h1>
        <div className=''>
            {/* <GoogleLogin /> */}
            <div className='border my-5 flex justify-center items-center'>
                <span className='absolute bg-white text-sm'>Or</span>
            </div>

        </div>


        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  >
                <div className='mb-3'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='mb-3'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='mb-3'>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='mb-3'>
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter  password again" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='mt-5'>
                    <Button type="submit" className="w-full">Sign Up</Button>
                    <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                        <p>Already have account?</p>
                        <Link className='text-blue-500 hover:underline' to={RouterSignIn}>Sign In</Link>
                    </div>
                </div>
            </form>
        </Form>
    </Card>

</div>
  )
}

export default Signup