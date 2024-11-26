// 1.4 And first what we export here will be a func validateEmail, which accepts email as a string.
// 1.5 Next we trim the email with like-named method and assign it to trimmedEmail constant. And also check if trimmedEmail is empty after trimming then return an empty array.
// 1.6 And we’ll create another constant 'errors' to store all the errors that come out of validations.
// 1.7 Also let’s see if the email in correct format via special regular expression for emails. And then assign it to another constant 'isValidEmailFormat' by putting trimmedEmail to the test method with regex.
// 1.8 Then let’s do the conditional to check if the email in correct format and if it’s not we’ll push the notice about it to the errors array.
export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) errors.push('Not a valid email format')

  // ...any other validation rules here...

  return errors
}

// 1.9 Moving to the password validation.
// 1.10 We won’t trim anything here as sometimes people using spaces in their passwords. But we’ll return empty array if password not typed in.
// 1.11 Then same as above we’ll have an empty array for the errors.
// 1.12 And let’s make at least one validation to make sure the password is not shorter than 6 letters, so that raises the security of the user account. And we’ll push the notice to the errors array if typed in password is shorter.
// Go to [src\composables\formErrors.ts]
export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length <= 6) errors.push('Password must be more than 6 characters')

  // ...any other validation rules here...

  return errors
}
