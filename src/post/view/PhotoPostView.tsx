import large from '@/imgs/large.jpg'

export default PhotoPostView

function PhotoPostView() {
  return (
    <div>
      <div>
        <img className="w-full" src={large} />
      </div>

      <div>
        <a href="/post/1">Back</a> | 
        <a href="/">Go to Home</a>
      </div>
    </div>
  )
}