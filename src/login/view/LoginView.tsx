import { Link, useNavigate } from 'react-router-dom'
import { Icon } from "@mdi/react"
import { mdiLogin, mdiEye, mdiEyeOff } from "@mdi/js"
import { useFormik } from "formik"
import { useState } from 'react'
import * as Yup from 'yup';
import type { Login } from '../types'
import { doLoginApi } from '../data/loginService'

export default LoginView

function LoginView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  })

  const formFormik = useFormik<Login>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const resp = await doLoginApi(values)
        console.log(resp)
        navigate('/', { replace: false })
      } catch(err) {
        const error = err as Error
        console.error(error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(value => {
      return !value
    })
  }

  return (
    <section>
      <h2>Login!</h2>
      
      <div>
        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputEmail" className="label">
              <span className="label-text">Email</span>
            </label>
            <input id="inputEmail" name="email" type="email"
              data-test="email" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.email}
              onChange={formFormik.handleChange} />

            {formFormik.errors.email && (
              <p className="text-error text-sm font-bold w-50"
                data-test="email-error">
                * {formFormik.errors.email}
              </p>
            )}
          </div>
          
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputPassword" className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex flex-row">
              <input id="inputPassword" name="password" 
                data-test="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.password}
                onChange={formFormik.handleChange}
                />
              <button type="button"
                data-test="show-password"
                className="ml-2 link link-primary"
                onClick={toggleShowPassword}>
                {showPassword ?
                  <Icon data-test="hide-icon" path={mdiEyeOff} size={1} />
                :
                  <Icon data-test="show-icon" path={mdiEye} size={1} />
                }
              </button>
            </div>
            
            {formFormik.errors.password && (
              <p className="text-error text-sm font-bold w-50"
                data-test="password-error">
                * {formFormik.errors.password}
              </p>
            )}
          </div>

          <div className="mt-3 ml-28">
            {error && (
              <div className="min-h-8"
                data-test="error">  
                <p className="text-error text-left">
                  {error}
                </p>  
              </div>
            )}

            {isLoading && <p>Loading...</p>}
            <button type="submit"
              data-test="login" 
              className="btn gap-2">
              
              <Icon path={mdiLogin} size={1} />
              Login
            </button>
          </div>
        </form>
      </div>

      <section className="hidden">
        <h3>Social Login</h3>
        
        <div>
          <button>Login with Twitter</button> 
          <button>Login with Facebook</button> 
          <button>Login with Google</button> 
          <button>Login with Github</button>
        </div>
      </section>

      <footer className="mt-3 border px-2">
        <div>
          <p className="font-bold">Don't you have a account?</p>
          <Link className="link" 
            data-test="register"
            to="/register">Register</Link>
        </div>

        <div>
          <p className="font-bold">You forgot your password?</p>
          <Link className="link" 
            data-test="recover"
            to="/recover-password">Recover Password</Link>
        </div>
      </footer>
    </section>
  )
}