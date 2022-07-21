import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { checkDraftPostApi, createPostInfoApi, deletePostApi } from '../data/postService'

export default CreatePostInfoView

function CreatePostInfoView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()
  const params = useParams()
  let id = Number(params.id)
  id = isNaN(id) ? -1 : id

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        setError('')
        if (id < 0) {
          return navigate('/')
        }

        const checkedResult = await checkDraftPostApi()
        console.log(checkedResult)
        const info = checkedResult.info!
        if (!info || info.id !== id) {
          return navigate(`/`)
        }

        if (info.status === 'CREATED') {
          return navigate(`/post/${id}/create/photo`)
        }

        setPhoto(info.photo)

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

  const formik = useFormik({
    initialValues: {
      description: '',
      hashtags: '',
      photoDatetime: new Date(Date.now()-(new Date()).getTimezoneOffset()*60000).toISOString().replace(/:\d\d.\d\d\dZ/, ''),
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        setError('')

        const vls = {
          ...values,
          photoDatetime: new Date(values.photoDatetime).toISOString()
        }

        await createPostInfoApi(id, vls)
        navigate(`/`)
  
      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  })

  const deleteDraft = async () => {
    try {
      setIsLoading(true)
      setError('')

      await deletePostApi(id)
      navigate(`/`)

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
      <h2>Create a New Post!</h2>

      <img className="w-25" src={photo} />

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="font-bold">Description</label>
            <textarea id="txtDescription"
              name="description"
              className="form-control textarea textarea-primary w-full"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}></textarea>
          </div>

          <div>
            <label className="font-bold">Hashtags</label>
            <input type="text"
              name="hashtags" 
              className="form-control input input-primary w-full"
              value={formik.values.hashtags}
              onChange={formik.handleChange}
              />
          </div>

          <div>
            <label className="font-bold">When did you take this photo?</label>
            <input type="datetime-local" 
              name="photoDatetime"
              className="block input input-primary"
              max={new Date(Date.now()-(new Date()).getTimezoneOffset()*60000).toISOString().replace(/:\d\d.\d\d\dZ/, '')}
              value={formik.values.photoDatetime}
              onChange={formik.handleChange}
              />
          </div>
          
          <div className="mt-3">
            <button type="button" 
              className="btn btn-warning"
              onClick={deleteDraft}>Delete Draft</button> |
            <button type="submit" 
              className="btn btn-success">Create</button>
          </div>
        </form>
        
      </div>

      <footer>
        <Link to="/" className="link">Go to Home</Link>
      </footer>
    </section>
  )
}