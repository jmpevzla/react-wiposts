import { useFormik } from "formik"
import { useState } from 'react'
import * as Yup from 'yup';
import { Icon } from "@mdi/react"
import { mdiKey } from "@mdi/js"

export default ChangePasswordView

function ChangePasswordView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  //const navigate = useNavigate()

  const ChangeSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().required('Required'),
    confNewPassword: Yup.string().required('Required'),
  })

  const formFormik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confNewPassword: ''
    },
    validationSchema: ChangeSchema,
    onSubmit: async (values) => {
      console.log(values)
    }
  })
  
  return (
    <section>
      <h2>Change Your Password</h2>
      
      <div>
        <form onSubmit={formFormik.handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputOldPassword" className="label">
              <span className="label-text">Old Password</span>
            </label>
            <input id="inputOldPassword" 
              name="oldPassword" type="password" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.oldPassword}
              onChange={formFormik.handleChange} />

            {formFormik.errors.oldPassword && (
              <p className="text-error text-sm font-bold w-50">
                * {formFormik.errors.oldPassword}
              </p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label htmlFor="inputNewPassword" className="label">
              <span className="label-text">New Password</span>
            </label>
            <input id="inpuNewPassword" 
              name="newPassword" type="password" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.newPassword}
              onChange={formFormik.handleChange} />

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
            <input id="inpuConfNewPassword" 
              name="confNewPassword" type="password" 
              className="input input-bordered w-full max-w-xs" 
              value={formFormik.values.confNewPassword}
              onChange={formFormik.handleChange} />

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