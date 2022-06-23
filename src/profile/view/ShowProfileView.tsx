export default ShowProfileView

function ShowProfileView() {
  return (
    <section>
      <h2>demo@wiposts.io</h2>

      <div>
        <a href="/profile/edit">Edit Profile</a>
      </div>

      <div>
        <img className="w-52" src="https://picsum.photos/200/150?grayscale" />
        <a href='/profile/photo'>Photo</a>
        <button type="button">Change Photo</button>
      </div>

      <div>
        <p>demo</p>
        <p>10 posts</p>
        <p>Your Name</p>
        <p>Description</p>
        <a href="">www.demo.com</a>
      </div>

      <section>
        <h3>Publicaciones</h3>
        <article></article>
      </section>
    </section>
  )
}