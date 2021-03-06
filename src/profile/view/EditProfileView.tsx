import { useFormik } from "formik"
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from "@mdi/react"
import { mdiAccountEdit, mdiAccountBoxMultiple } from "@mdi/js"
import { editProfileApi, getProfileApi, uploadPhotoApi } from "../data/profileService"
import { Profile } from "../types"

export default EditProfileView

function EditProfileView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<Profile>({
    username: '',
    email: '',
    name: '',
    phone: '',
    birthday: '',
    gender: '',
    description: '',
    website: '',
    photo: ''
  })
  const navigate = useNavigate()

  const EditProfileSchema = Yup.object().shape({
    name: Yup.string(),
    phone: Yup.string(),
    birthday: Yup.date(),
    gender: Yup.string(),
    description: Yup.string(),
    website: Yup.string().url('Invalid URL')
  })

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        const res = await getProfileApi()
        setProfile(res.info!)

      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
    
  }, [])

  

  const formFormik = useFormik({
    initialValues: {
      name: profile.name,
      phone: profile.phone,
      birthday: profile.birthday,
      gender: profile.gender,
      description: profile.description,
      website: profile.website
    },
    enableReinitialize: true,
    validationSchema: EditProfileSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        setError('')
        await editProfileApi(values)
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

  async function handleChangePhoto(ev: React.ChangeEvent<HTMLInputElement>) {
    try {
      setIsLoading(true)
      setError('')
      const files = ev.currentTarget.files
      if (!(files && files.length > 0)) {
        return
      }

      const photoFile = files[0]
      switch(photoFile.type) {
        case 'image/jpeg': 
        case 'image/png':           
        case 'image/gif': 
        case 'image/svg+xml':
          break
        default:
          throw new Error('File Invalid')
      }

      const resp = await uploadPhotoApi(photoFile)
      setProfile({
        ...profile,
        photo: resp.info?.photo || ''
      })

      //navigate('/profile')
    } catch(err) {
      const error = err as Error
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <section>
      <h2>Your Profile</h2>

      <div>
        <div>
          <img data-test="photo" className="w-52" src={profile.photo} />
          <div className="mt-2 flex flex-row gap-x-2">
            <Link data-test="link-photo" 
              className="link" to='/profile/photo'>Photo</Link>
            
            <input id="inputPhoto" type="file" 
              className="form-control-file hidden"
              data-test="input-photo" 
              name="photo" onChange={handleChangePhoto} 
              accept=".jpg,.gif,.svg,.png" 
              title="" value="" />
            
            <label htmlFor="inputPhoto"
              data-test="change-photo"
              className="btn gap-2">
              <Icon path={mdiAccountBoxMultiple} size={1} />
              Change Photo
            </label>
          </div>
        </div>

        <div>
          <form onSubmit={formFormik.handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputUsername" className="label">
                <span className="label-text">Username</span>
              </label>
              <input id="inputUsername" 
                type="text"
                data-test="username" 
                className="input input-bordered w-full max-w-xs" 
                value={profile.username}
                disabled />
            </div>

            <div>
              <div className="form-control w-full max-w-xs">
                <label htmlFor="inputEmail" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input id="inputEmail" 
                  type="email"
                  data-test="email" 
                  className="input input-bordered w-full max-w-xs" 
                  value={profile.email}
                  disabled />
              </div>
              <Link data-test="change-email" 
                className="link" to="/profile/change-email">Change Email</Link>
            </div>

            <div>
              <Link data-test="change-password"
                className="link" to="/profile/change-password">Change Password</Link>
            </div>

            <div className="form-control w-full max-w-xs">
              <label htmlFor="inputName" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input id="inputFullName" 
                name="name" type="text"
                data-test="full-name" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.name}
                onChange={formFormik.handleChange} />

              {formFormik.errors.name && (
                <p className="text-error text-sm font-bold w-50"
                  data-test="full-name-error">
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
                data-test="phone" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.phone}
                onChange={formFormik.handleChange} />

              {formFormik.errors.phone && (
                <p className="text-error text-sm font-bold w-50"
                  data-test="phone-error">
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
                data-test="birthday" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.birthday}
                onChange={formFormik.handleChange} />

              {formFormik.errors.birthday && (
                <p className="text-error text-sm font-bold w-50"
                  data-test="birthday-error">
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
                data-test="gender" 
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
                data-test="description"
                className="input input-bordered w-full max-w-xs h-28 p-2" 
                value={formFormik.values.description}
                onChange={formFormik.handleChange}></textarea>

              {formFormik.errors.description && (
                <p className="text-error text-sm font-bold w-50"
                  data-test="description-error">
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
                data-test="website" 
                className="input input-bordered w-full max-w-xs" 
                value={formFormik.values.website}
                onChange={formFormik.handleChange} />

              {formFormik.errors.website && (
                <p className="text-error text-sm font-bold w-50"
                  data-test="website-error">
                  * {formFormik.errors.website}
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
                data-test="edit"
                className="btn gap-2">
                
                <Icon path={mdiAccountEdit} size={1} />
                Change Now
              </button> 
            </div>

          </form>
        </div>
      </div>

      <footer className="mt-3 flex flex-row gap-x-2">
        <Link data-test="home" className="link" to='/'>Home</Link>
        <Link data-test="profile" className="link" to='/profile'>Profile</Link>
      </footer>
    </section>
  )
}