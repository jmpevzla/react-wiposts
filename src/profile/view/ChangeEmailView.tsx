import { useFormik } from "formik"
import { useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from "@mdi/react"
import { mdiEmailLock } from "@mdi/js"
import { changeEmailApi } from "../data/profileService"

export default ChangeEmailView

function ChangeEmailView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const ChangeEmailSchema = Yup.object().shape({
    temporalEmail: Yup.string().email('Invalid Email').required('Required')
  })
  
  const formFormik = useFormik({
    initialValues: {
      temporalEmail: ''
    },
    validationSchema: ChangeEmailSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        setError('')
        await changeEmailApi(values)
        navigate('/profile')
      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <section>
      <h2>Change Email</h2>

      <div>
        <div>
          <form onSubmit={formFormik.handleSubmit}>
            <div>
              <div className="form-control w-full max-w-xs">
                <label htmlFor="inputEmail" className="label">
                  <span className="label-text">New Email</span>
                </label>
                <input id="inputEmail" 
                  type="email"
                  data-test="email"
                  name="temporalEmail"
                  className="input input-bordered w-full max-w-xs" 
                  value={formFormik.values.temporalEmail}
                  onChange={formFormik.handleChange} />
              </div>
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
                data-test="edit"
                className="btn gap-2">
                
                <Icon path={mdiEmailLock} size={1} />
                Change Now
              </button> 
            </div>

          </form>
        </div>
      </div>

      <footer className="mt-3 flex flex-row gap-x-2">
        <Link data-test="home" className="link" to='/'>Home</Link>
        <Link data-test="profile" className="link" to='/profile/edit'>Edit Profile</Link>
        <Link data-test="profile" className="link" to='/profile'>Profile</Link>
      </footer>
    </section>
  )
}