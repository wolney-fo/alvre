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

export default function Login() {
  const loginFormSchema = z.object({
    email: z
      .email({ error: 'E-mail inválido' })
      .nonempty()
      .trim()
      .toLowerCase(),
    password: z.string().min(6, { error: 'Min. de 6 caracteres' }),
  })

  type LoginFormSchema = z.infer<typeof loginFormSchema>

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  async function onSubmit(data: LoginFormSchema) {
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="voce@exemplo.com.br"
                        type="email"
                        autoComplete="off"
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  'Entrar'
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
            Não tem uma conta?{' '}
            <Link href={'/sign-up'} className="text-primary hover:underline">
              Criar agora
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
