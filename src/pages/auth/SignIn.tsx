import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AnimatedDiv from "@animations/AnimatedDiv"
import { appLogo } from "@assets/index"
import { zodResolver } from "@hookform/resolvers/zod"
import useLocalStorage from "@hooks/useLocalStorage"
import { useAppDispatch, useAppSelector } from "@store/store"
import { AuthAPI } from "@store/thunk-services/auth.thunk"
import Image from "@ui/Image"
import { LocalStorageKeys, NavigationRoutes } from "@utils/constant"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

type SignInFormValues = z.infer<typeof signInSchema>

const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isSignInError, isSignInLoading } = useAppSelector(
    state => state.auth
  )
  const [__, setAccessToken] = useLocalStorage(
    LocalStorageKeys.ACCESS_TOKEN,
    ""
  )
  const [_, setAdminData] = useLocalStorage(LocalStorageKeys.USER_DATA, {})

  const onSubmit = async (data: SignInFormValues) => {
   
      const response = await dispatch(
        AuthAPI.signIn({
          signInCredentials: {
            email: data.email,
            password: data.password,
          },
        })
      ).unwrap()

      if (response?.accessToken) {
        setAccessToken(response.accessToken)
        setAdminData(response?.data ?? {})
        navigate(NavigationRoutes.BASE, { replace: true })
      }
  }

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
        <AnimatedDiv className="w-full max-w-sm gap-4 shadow-lg py-5" delay={0.5} animationType="slide-top">
      <Card>
        <CardHeader className="flex gap-4">
          <div className="flex justify-center min-w-18 w-18 aspect-square">
            <Image highResSrc={appLogo} alt="logo"  />
          </div>
          <div>
          <CardTitle className="text-lg font-semibold">
            Login to Account
          </CardTitle>
          <CardDescription className="text-xs">
            Please enter your email and password to continue
          </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {isSignInError && (
                <div className="w-full bg-red-200 py-2 px-5 rounded-sm text-red-600 text-sm">Invalid Credentials</div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-[#202224]">Email address:</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="vipul@gmail.com"
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs text-t-202224">Password</FormLabel>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="admin@1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-xs text-t-202224">Remember Password</FormLabel>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#199FB1] hover:bg-#199FB1 text-white"
                disabled={isSignInLoading}
              >
                {isSignInLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
        </AnimatedDiv>
    </div>
  )
}

export default SignIn
