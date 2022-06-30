import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiXml } from '@mdi/js'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export default RecPasswordView

function RecPasswordView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const RecPassSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
  })

  const formFormik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: RecPassSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      navigate('/recover-password/code')
    }
  })

  return (
    <section>
      <h2>Recover Password</h2>

      <div>
        <p className="text-sm">Get a code to your e-mail for create a new password</p>
        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputEmail" className="label">
              <span className="label-text">Email</span>
            </label>
            <input id="inputEmail" 
              name="email" type="email" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.email}
              onChange={formFormik.handleChange} />

            {formFormik.errors.email && (
              <p className="text-error text-sm font-bold w-50">
                * {formFormik.errors.email}
              </p>
            )}
          </div>

          <div className="mt-3">
            {error && (
              <div className="min-h-8">  
                <p className="text-error text-left">
                  {error}
                </p>  
              </div>
            )}

            {isLoading && <p>Loading...</p>}

            <button type="submit" 
              className="btn gap-2">
                <Icon path={mdiXml} size={1} />
                Get Code
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-3">
        <Link className="link" to="/login">Return to Login</Link>
      </footer>
    </section>
  )
}