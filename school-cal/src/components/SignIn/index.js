import React, { useContext } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../contexts/auth/authState"
import ReactGA from "react-ga"
import SignInForm from "./SignInForm"
const SignInSchema = Yup.object().shape({
  userId: Yup.string().required("User ID is required."),
  password: Yup.string()
    .min(6, "Password must be greater 6 characters.")
    .required("Password is required."),
})
const SignIn = ({ path }) => {
  const {
    isLoading,
    signInError,
    signInWithUserIdAndPassword,
    signInWithGoogle,
  } = useContext(AuthContext)
  return (
    <div>
      <Formik
        initialValues={{ userId: "", password: "" }}
        onSubmit={(values, actions) => {
          ReactGA.event({
            category: "Sign In",
            action: "Existing User Signed In",
          })
          signInWithUserIdAndPassword(values)
          actions.resetForm()
        }}
        render={formikProps => (
          <SignInForm
            {...formikProps}
            isLoading={isLoading}
            signInError={signInError}
            signInWithGoogle={signInWithGoogle}
            path={path}
          />
        )}
        validationSchema={SignInSchema}
      />
    </div>
  )
}

export default SignIn
