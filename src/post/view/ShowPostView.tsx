export default ShowPostView

function ShowPostView() {
  return (
    <section>
      <h2>Post</h2>

      <div>
        <div>
          <a href="/profile">
            <img className="w-28" src="https://picsum.photos/100/50?grayscale" />
          </a>
          <p>Your Name</p>
          <p>(10) Posts</p>
        </div>

        <div>
          <a href="/post/1/photo">
            <img className="w-60" src="https://picsum.photos/300/200?grayscale" />
          </a>
          <p>Description</p>
          <p>date published (21/06/2022)</p>
          <p>date took it (21/06/2022)</p>
          <p>Hashtags (paradise, Sun light, moon)</p>  
        </div>
      </div>

      <footer>
        <a href='/'>Return to Home</a>
      </footer>
    </section>
  )
}