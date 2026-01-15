'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SignUp() {
  const signUpFormSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
        .trim(),
      email: z.email({ message: 'E-mail inválido' }).toLowerCase().trim(),
      password: z
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
      confirmPassword: z.string().min(6, {
        message: 'Confirmação de senha deve ter no mínimo 6 caracteres',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    })

  type SignUpFormSchema = z.infer<typeof signUpFormSchema>

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: SignUpFormSchema) {
    console.log(data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center w-screen py-4 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="font-bold text-2xl">📦 Alvre</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        type="text"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="voce@exemplo.com.br"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col text-xs text-center text-muted-foreground space-y-4">
          <p>
            Ao continuar, você concorda com nossos{' '}
            <Link href={'/terms'} className="text-primary hover:underline">
              Termos de uso
            </Link>{' '}
            e{' '}
            <Link href={'/privacy'} className="text-primary hover:underline">
              Política de privacidade
            </Link>
            .
          </p>

          <p>
            Já tem uma conta?{' '}
            <Link href={'/sign-in'} className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
