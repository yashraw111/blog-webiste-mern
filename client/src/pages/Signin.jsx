import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { RouterSignUp } from '@/helpers/RouteName'

const Signin = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Password field  required.')
})

const form = useForm({
    resolver: zodResolver (formSchema),
    defaultValues: {
        email: '',  
        password: '',
    },
})

async function onSubmit(values) {
  
}
  return (
    <div>
  <div className='flex justify-center items-center h-screen w-screen'>
            <Card className="w-[400px] p-5">
                <div className='flex justify-center items-center mb-2'>

                      {/* <Link to={RouteIndex}>
                          <img src={logo} />
                      </Link> */}
                </div>
                <h1 className='text-2xl font-bold text-center mb-5'>Login Into Account</h1>
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

                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Sign In</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Don&apos;t have account?</p>
                                <Link className='text-blue-500 hover:underline' to="/sign-up">Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>

        </div>
    </div>
  )
}

export default Signin