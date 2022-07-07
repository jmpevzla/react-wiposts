import { useFormik } from "formik"
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Icon } from "@mdi/react"
import { mdiKey, mdiEye, mdiEyeOff } from "@mdi/js"
import { recoverPasswordChangeApi
  , recoverPasswordCodeApi } from "../data/recoverService"

export default RecPasswordChangeView

function RecPasswordChangeView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const RecPassChangeSchema = Yup.object().shape({
    newPassword: Yup.string().required('Required'),
    confNewPassword: Yup.string().required('Required')
      .equals([Yup.ref('newPassword')], 'Must be equal a new password'),
  })

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        setError('')
        const data = {
          tokenId: params.tokenId || '',
          code: params.code || ''
        }
        await recoverPasswordCodeApi(data)
        console.log('token-code OK')
        //navigate('/profile')
      } catch(err) {
        const error = err as Error
        //setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const formFormik = useFormik({
    initialValues: {
      newPassword: '',
      confNewPassword: ''
    },
    validationSchema: RecPassChangeSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log(values)
      // navigate('/login')
      try {
        setIsLoading(true)
        setError('')
        const data = {
          ...values,
          tokenId: params.tokenId || '',
          code: params.code || ''
        }
        await recoverPasswordChangeApi(data)
        console.log('OK')
        //navigate('/profile')
      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  })

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
      <h2>Create Your Password</h2>
      
      <div>
        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputNewPassword" className="label">
              <span className="label-text">New Password</span>
            </label>
            <div className="flex flex-row">
              <input id="inpuNewPassword" 
                name="newPassword" 
                type={showPassword ? "text" : "password"} 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.newPassword}
                onChange={formFormik.handleChange} />
              <button type="button"
                className="ml-2 link link-primary"
                onClick={toggleShowPassword}>
                {showPassword ?
                  <Icon path={mdiEyeOff} size={1} />
                :
                  <Icon path={mdiEye} size={1} />
                }
              </button>
            </div>

            {formFormik.errors.newPassword && (
              <p className="text-error text-sm font-bold w-50">
                * {formFormik.errors.newPassword}
              </p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputConfNewPassword" className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <div className="flex flex-row">
              <input id="inpuConfNewPassword" 
                name="confNewPassword" 
                type={showConfPassword ? "text" : "password"} 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.confNewPassword}
                onChange={formFormik.handleChange} />
              <button type="button"
                className="ml-2 link link-primary"
                onClick={toggleShowConfPassword}>
                {showConfPassword ?
                  <Icon path={mdiEyeOff} size={1} />
                :
                  <Icon path={mdiEye} size={1} />
                }
              </button>
            </div>

            {formFormik.errors.confNewPassword && (
              <p className="text-error text-sm font-bold w-50">
                * {formFormik.errors.confNewPassword}
              </p>
            )}
          </div>

          <div className="mt-3 ml-28">
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
              
              <Icon path={mdiKey} size={1} />
              Change Now
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}