import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Icon } from '@mdi/react'
import { mdiImagePlus } from '@mdi/js'
import { checkDraftPostApi, createPostPhotoApi, deletePostApi } from '../data/postService'

export default CreatePostPhotoView

function CreatePostPhotoView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [photo, setPhoto] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [showCapture, setShowCapture] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

        if (info.status === 'PHOTO') {
          return navigate(`/post/${id}/create/info`)
        }

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


  const onSelectPhoto = async (ev: React.ChangeEvent<HTMLInputElement>) => {
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

      if (photo) {
        URL.revokeObjectURL(photo)
      }

      const objURL = URL.createObjectURL(photoFile)
      setPhoto(objURL)
      setPhotoFile(photoFile)

    } catch(err) {
      const error = err as Error
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRandomPhoto = async () => {
    try {
      setIsLoading(true)
      setError('')
      const response = await axios.get('https://picsum.photos/300/400', {
        responseType: 'blob'
      })
      
      const metadata = { type: response.data.type }
      const photoFile = new File([response.data], "random", metadata)
      //console.log(photoFile)

      if (photo) {
        URL.revokeObjectURL(photo)
      }

      const objURL = URL.createObjectURL(photoFile)
      setPhoto(objURL)
      setPhotoFile(photoFile)

    } catch(err) {
      const error = err as Error
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadPhoto = async () => {
    try {
      setIsLoading(true)
      setError('')
     
      if (photoFile && photo) {
        await createPostPhotoApi(id, photoFile)
        URL.revokeObjectURL(photo)
        navigate(`/post/${id}/create/info`)
      }

    } catch(err) {
      const error = err as Error
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const onTakePhoto = async () => {
    const constraints = {
      video: {
        width: 800, height: 600
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setShowCapture(true) 
      setTimeout(() => {
        videoRef.current!.srcObject = stream;
      }, 0)
    } catch (e: any) {
      console.error(`navigator.getUserMedia error:${e.toString()}`);
    }
  }

  const onCapture = () => {
    const canvas = canvasRef.current!
    const video = videoRef.current!
    
    var context = canvas.getContext('2d')!;
    context.drawImage(video, 0, 0, 640, 480);
  }

  const onOkCapture = () => {
    const canvas = canvasRef.current!
    const video = videoRef.current!
    const stream = video.srcObject as MediaStream

    var context = canvas.getContext('2d')!;
    canvas.toBlob((blob) => {
      const photoFile = new File([blob!], "camera.jpg", { type: "image/jpeg" })
      
      if(photo) {
        URL.revokeObjectURL(photo)
      }
      
      const objURL = URL.createObjectURL(photoFile)
      setPhoto(objURL)
      setPhotoFile(photoFile)

      context.clearRect(0, 0, canvas.width, canvas.height);
      video.pause()
      video.srcObject = null
      stream.getTracks()[0].stop()
      setShowCapture(false)
    }, 'image/jpeg', 0.95)
  }

  return (
    <section>
      <h2>Create a New Post!</h2>

      <section>
        <h3>Photo</h3>

        <img className="w-60" src={photo} />
        {showCapture && (
          <div>
            <div className="video-wrap">
              <video ref={videoRef} playsInline autoPlay></video>
            </div>

            <div className="controller">
              <button className="btn" onClick={onCapture}>Capture</button> | 
              <button className="btn" onClick={onOkCapture}>Ok</button>
            </div>

            <canvas ref={canvasRef} width="640" height="480"></canvas> 
          </div>
        )}

        <div className="mt-3">
          <button className="btn btn-primary" onClick={onTakePhoto}>Take a Photo</button> | 
          <input id="inputPhoto" type="file" 
              className="form-control-file hidden" 
              data-test="input-photo"
              name="photo" onChange={onSelectPhoto} 
              accept=".jpg,.gif,.svg,.png" 
              title="" value="" />
            
          <label htmlFor="inputPhoto"
            data-test="change-photo"
            className="btn">
            <Icon path={mdiImagePlus} size={1} />
            Select Photo
          </label> | 

          <button className="btn btn-primary"
            onClick={onRandomPhoto}>Photo Random</button> 
        </div>
        
        <div>
        <button type="button" 
              className="btn btn-warning"
              onClick={deleteDraft}>Delete Draft</button> |
          <button className="btn btn-success"
            onClick={uploadPhoto}>Next</button>
        </div>
        
      </section>

      <footer>
        <Link to="/" className="link">Go to Home</Link>
      </footer>
    </section>
  )
}