import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'

import { Post } from '../types'
import { deletePostApi, postDataApi
 , editPostApi } from '../data/postService'

export default EditPostDescView

function EditPostDescView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [post, setPost] = useState<Post | null>(null)
  const navigate = useNavigate()
  const params = useParams()
  let id = Number(params.id)
  id = isNaN(id) ? -1 : id

  useEffect(() => {
    async function load() {
      if (id < 0) {
        return navigate('/')
      }

      try {
        setIsLoading(true)
        const postResult = await postDataApi(id)
        const info = postResult.info!
        info.photoDatetime = new Date(new Date(info.photoDatetime).getTime() - (new Date()).getTimezoneOffset()*60000).toISOString().replace(/:\d\d.\d\d\dZ/, '')
        setPost(info)
      } catch(err) {
        console.error(err)
        navigate('/')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const formik = useFormik({
    initialValues: {
      description: post?.description || '',
      hashtags: post?.hashtags || '',
      photoDatetime: post?.photoDatetime || ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        setError('')

        const vls = {
          ...values,
          photoDatetime: new Date(values.photoDatetime).toISOString()
        }

        await editPostApi(id, vls)
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

  const deletePost = async () => {
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
      <h2>Edit Your Post</h2>

      <div>
        <div>
          <Link to={`/post/${id}/photo`}>
            <img className="w-25" src={post?.photo} />
          </Link>
        </div>

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
              onClick={deletePost}>Delete Post</button> |
            <button type="submit" 
              className="btn btn-success">Update</button>
          </div>
        </form>
        
      </div>

      <footer>
        <Link className="link" to="/">Go to Home</Link>
      </footer>
    </section>
  )
}