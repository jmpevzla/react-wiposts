import large from '@/imgs/large.jpg'

export default CreatePostView

function CreatePostView() {
  return (
    <section>
      <h2>Create a New Post!</h2>

      <section>
        <h3>Photo</h3>

        <form>
          <img className="w-60" src={large} />

          <button>Take a Photo</button> | 
          <button>Select a Photo</button> |
          <button>Photo Random</button> 

          <div>
            <a href="/post/1/create/description">Next</a> |
            <a href="/">Cancel</a> |
          </div>
        </form>
      </section>

      <footer>
        <a href="/">Go to Home</a>
      </footer>
    </section>
  )
}