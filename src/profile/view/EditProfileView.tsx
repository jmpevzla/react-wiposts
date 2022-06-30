import { useFormik } from "formik"
import { useState } from 'react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { Icon } from "@mdi/react"
import { mdiAccountEdit } from "@mdi/js"
import large from '@/imgs/large.jpg'

export default EditProfileView

function EditProfileView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  //const navigate = useNavigate()

  const EditProfileSchema = Yup.object().shape({
    name: Yup.string(),
    phone: Yup.string(),
    birthday: Yup.date(),
    gender: Yup.string(),
    description: Yup.string(),
    website: Yup.string().url('Invalid URL')
  })

  const formFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      birthday: '',
      gender: '',
      description: '',
      website: ''
    },
    validationSchema: EditProfileSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <section>
      <h2 className="text-red-600">Your Profile</h2>

      <div>
        <div>
          <img className="w-52" src={large} />
          <a href='/profile/photo'>Photo</a>
          <button type="button">Change Photo</button>
        </div>

        <div>
          <form onSubmit={formFormik.handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputUsername" className="label">
                <span className="label-text">Username</span>
              </label>
              <input id="inputUsername" 
                type="text" 
                className="input input-bordered w-full max-w-xs" 
                value="demo user"
                disabled />
            </div>

            <div>
              <div className="form-control w-full max-w-xs">
                <label htmlFor="inputEmail" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input id="inputEmail" 
                  type="email" 
                  className="input input-bordered w-full max-w-xs" 
                  value="demo@wipost.io"
                  disabled />
              </div>
              <Link className="link" to="/profile/change-email">Change Email</Link>
            </div>

            <div>
              <Link className="link" to="/profile/change-password">Change Password</Link>
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputName" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input id="inputFullName" 
                name="name" type="text" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.name}
                onChange={formFormik.handleChange} />

              {formFormik.errors.name && (
                <p className="text-error text-sm font-bold w-50">
                  * {formFormik.errors.name}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputPhone" className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input id="inputPhone" 
                name="phone" type="tel" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.phone}
                onChange={formFormik.handleChange} />

              {formFormik.errors.phone && (
                <p className="text-error text-sm font-bold w-50">
                  * {formFormik.errors.phone}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputBirthday" className="label">
                <span className="label-text">Birthday</span>
              </label>
              <input id="inputBirthday" 
                name="birthday" type="date" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.birthday}
                onChange={formFormik.handleChange} />

              {formFormik.errors.birthday && (
                <p className="text-error text-sm font-bold w-50">
                  * {formFormik.errors.birthday}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputGender" className="label">
                <span className="label-text">Gender</span>
              </label>
              <select id="inputGender"
                name="gender" 
                className="input input-bordered w-full max-w-xs"
                value={formFormik.values.gender}
                onChange={formFormik.handleChange}>

                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Custom">Custom</option>
                <option value="I prefer not to answer">
                  I prefer not to answer
                </option>
              </select>
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputDescription" className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea id="inputDescription" 
                name="description"
                className="input input-bordered w-full max-w-xs h-28 p-2" 
                value={formFormik.values.description}
                onChange={formFormik.handleChange}></textarea>

              {formFormik.errors.description && (
                <p className="text-error text-sm font-bold w-50">
                  * {formFormik.errors.description}
                </p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputWebsite" className="label">
                <span className="label-text">Your Website</span>
              </label>
              <input id="inputWebsite" 
                name="website" type="url" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.website}
                onChange={formFormik.handleChange} />

              {formFormik.errors.website && (
                <p className="text-error text-sm font-bold w-50">
                  * {formFormik.errors.website}
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
                
                <Icon path={mdiAccountEdit} size={1} />
                Change Now
              </button> 
            </div>

          </form>
        </div>
      </div>


    </section>
  )
}