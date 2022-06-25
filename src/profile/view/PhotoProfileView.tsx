import large from '@/imgs/large.jpg'

export default PhotoProfileView

function PhotoProfileView() {
  return (
    <section>
      <h2>Your Avatar</h2>

      <div>
        <img className="w-full" src={large} />
        <a href='/profile/photo'>Photo</a>
        <button type="button">Change Photo</button>
      </div>
    </section>
  )
}