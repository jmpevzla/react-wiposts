import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkDraftPostApi, createPostApi } from '@/post/data/postService'
import small from '@/imgs/small.jpg'
import large from '@/imgs/large.jpg'

export default HomeView

function HomeView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onCreatePost = async () => {
    try {
      setIsLoading(true)
      setError('')
      const checkedResult = await checkDraftPostApi()
      console.log(checkedResult)
      const infoDraft = checkedResult.info
      const toPhoto = (id: number) => `/post/${id}/create/photo`
      const toInfo = (id: number) => `/post/${id}/create/info`

      if (infoDraft) {
        switch(infoDraft.status) {
          case 'CREATED':
            return navigate(toPhoto(infoDraft.id))
          case 'PHOTO':
            return navigate(toInfo(infoDraft.id))
        }
      }
      
      const { info } = await createPostApi()
      console.log('OK Created')
      navigate(toPhoto(info!.id))
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
      <h1>Wiposts!</h1>

      <div>
        <a href="/profile" className="link">Profile</a>
      </div>

      <div>
        <button className="btn btn-primary"
          onClick={onCreatePost}>Create a Post</button>
      </div>

      <div>
        <input type="search" value="codes" />
        <div>
          <button>Filters</button> | 
          <button>Sort</button>
        </div>
      </div>

      <div>
        <article>
          <div>
            <img className="w-28" src={small} />
            <p>UserName <span>(10 posts)</span></p>
          </div>
          <div>
            <img className="w-52" src={large} />
            <p>Description</p>
            <p>Hashtags</p>
            <div className="flex justify-around">
              <p>Date Published: 24/06/2022</p>
              <p>Date Took it: 24/06/2022</p>
            </div>
          </div>
        </article>
      </div>

    </section>
  )
}
