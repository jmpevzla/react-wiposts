import small from '@/imgs/small.jpg'

export default EditPostDescView

function EditPostDescView() {
  return (
    <section>
      <h2>Edit Your Post</h2>

      <div>
        <form>
          <div>
            <a href='/post/1/photo'>
              <img className="w-25" src={small} />
            </a>
            <button>Change Photo</button>
          </div>

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
            <a href="/">Update</a>
          </div>
        </form>
        
      </div>

      <footer>
        <a href="/">Go to Home</a>
      </footer>
    </section>
  )
}