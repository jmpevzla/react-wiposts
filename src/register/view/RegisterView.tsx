import { Link, useNavigate } from "react-router-dom"
import { Icon } from "@mdi/react"
import { mdiAccountArrowUp, mdiEye, mdiEyeOff  } from "@mdi/js"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import type { Register } from "../types"
import { doRegisterApi } from "../data/registerService"

export default RegisterView

function RegisterView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)
  const navigate = useNavigate()

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confPassword: Yup.string().required('Required')
      .equals([Yup.ref('password')], 'confirm must be equal to password')
  })

  const formFormik = useFormik<Register>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confPassword: ''
    },
    validationSchema: RegisterSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const resp = await doRegisterApi(values)
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

  const toggleShowConfPassword = () => {
    setShowConfPassword(value => {
      return !value
    })
  }

  return (
    <section>
      <h2>Register Now!</h2>
      
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
              onChange={formFormik.handleChange}
              />

            {formFormik.errors.email && (
              <p className="text-error text-sm font-bold w-50"
                data-test="email-error">
                * {formFormik.errors.email}
              </p>
            )}
          </div>
          
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputUsername" className="label">
              <span className="label-text">Username</span>
            </label>
            <input id="inputUsername" name="username" type="text"
              data-test="username" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.username}
              onChange={formFormik.handleChange}
              />
            
            {formFormik.errors.username && (
              <p className="text-error text-sm font-bold w-50"
                data-test="username-error">
                * {formFormik.errors.username}
              </p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputPassword" className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex flex-row">
              <input id="inputPassword" name="password" 
                type={showPassword ? "text" : "password"}
                data-test="password"  
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

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputConfPassword" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="flex flex-row">
              <input id="inputConfPassword" name="confPassword" 
                type={showConfPassword ? "text" : "password"}
                data-test="conf-password"   
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.confPassword}
                onChange={formFormik.handleChange}
                />
              <button type="button"
                data-test="show-conf-password"
                className="ml-2 link link-primary"
                onClick={toggleShowConfPassword}>
                {showConfPassword ?
                  <Icon data-test="hide-icon" path={mdiEyeOff} size={1} />
                :
                  <Icon data-test="show-icon" path={mdiEye} size={1} />
                }
              </button>
            </div>

            {formFormik.errors.confPassword && (
              <p className="text-error text-sm font-bold w-50"
                data-test="conf-password-error">
                * {formFormik.errors.confPassword}
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
              className="btn gap-2"
              data-test="register">
              
              <Icon path={mdiAccountArrowUp} size={1} />
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <section className="hidden">
        <h3>Social Sign Up!</h3>
        
        <div>
          <button>Sign Up with Twitter</button> 
          <button>Sign Up with Facebook</button> 
          <button>Sign Up with Google</button> 
          <button>Sign Up with Github</button>
        </div>
      </section>

      <footer className="mt-3 border px-2">
        <div>
          <p className="font-bold">Do you have a account?</p>
          <Link data-test="login" className="link" to="/login">Login</Link>
        </div>
      </footer>
    </section>
  )
}