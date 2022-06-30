import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiLockPlus, mdiLockReset } from '@mdi/js'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export default RecPasswordView

function RecPasswordView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const RecPassCodeSchema = Yup.object().shape({
    code: Yup.string().length(6, 'code must be exactly 6 chars').required('Required'),
  })

  const formFormik = useFormik({
    initialValues: {
      code: ''
    },
    validationSchema: RecPassCodeSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
      navigate('/recover-password/change')
    }
  })

  return (
    <section>
      <h2>Recover Password</h2>

      <div>
        <p className="text-sm">With your code, create a new password</p>
        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputCode" className="label">
              <span className="label-text">Code</span>
            </label>
            <input id="inputCode" 
              name="code" type="text" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.code}
              onChange={formFormik.handleChange} />

            {formFormik.errors.code && (
              <p className="text-error text-sm font-bold w-50">
                * {formFormik.errors.code}
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
          </div>

          <div className="flex flex-row gap-x-2 mt-3">
            <button type="submit" 
              className="btn gap-2">
              <Icon path={mdiLockPlus} size={1} />
              Create new password
            </button>

            <button type="button"
              className="btn gap-2">
              <Icon path={mdiLockReset} size={1} />
              Send other code (in 15 secs)
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