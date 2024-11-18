// [src\types\AuthForm.ts]
// 4.4 And we’ll export a new interface. That’s where we’ll define how the register form will look like. What are the fields or the expected data.
// 4.5 We’ll do the same for the login form as well. And as email & password exist in both we can move them to LoginForm and extend RegisterForm from LoginForm. So the RegisterForm will include the email & password plus what we will put inside of it.
// Go to [src\utils\supabaseAuth.ts]
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  confirmPassword: string
  username: string
  firstName: string
  lastName: string
}
