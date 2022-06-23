export default CreatePostDescView

function CreatePostDescView() {
  return (
    <section>
      <h2>Create a New Post!</h2>

      <img className="w-25" src="https://picsum.photos/150/100?grayscale" />

      <div>
        <form>
          <div>
            <label>Description</label>
            <textarea rows={3} cols={10}></textarea>
          </div>

          <div>
            <label>Hashtags</label>
            <input type="text" />
          </div>

          <div>
            <label>When did you take this photo?</label>
            <input type="date" value={new Date(Date.now()-(new Date()).getTimezoneOffset()*60000).toISOString().split('T')[0]} />
          </div>
          
          <div>
            <a href="/">Create</a> |
            <a href="/post/1/create">Back to Photo</a> |
            <a href="/">Cancel</a>
          </div>
        </form>
        
      </div>


      <footer>
        <a href="/">Go to Home</a>
      </footer>
    </section>
  )
}