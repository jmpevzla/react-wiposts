import small from '@/imgs/small.jpg'
import large from '@/imgs/large.jpg'

export default HomeView

function HomeView() {
  return (
    <section>
      <h1>Wiposts!</h1>

      <div>
        <a href="/profile">Profile</a>
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
