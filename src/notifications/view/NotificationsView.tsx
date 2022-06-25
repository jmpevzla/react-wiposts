import small from '@/imgs/small.jpg'

export default NotificationsView

function NotificationsView() {
  return (
    <section>
      <h2>Notifications</h2>

      <div>
        <article>
          <div>
            <img className="w-28" src={small} />
            <p>USERNAME</p>
          </div>

          <div>
            <h3>New Post!</h3>
            <img className="w-28" src={small} />
            <p>Your Description</p>
          </div>
        </article>
        <p>---</p>
        <article>
          <div>
            <img className="w-28" src={small} />
            <p>USERNAME</p>
          </div>

          <div>
            <h3>Update Post!</h3>
            <img className="w-28" src={small} />
            <p>Your Description</p>
          </div>
        </article>
      </div>
    </section>
  )
}