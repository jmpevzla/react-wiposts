export default PhotoPostView

function PhotoPostView() {
  return (
    <div>
      <div>
        <img className="w-full" src="https://picsum.photos/400/300?grayscale" />
      </div>

      <div>
        <a href="/post/1">Back</a> | 
        <a href="/">Go to Home</a>
      </div>
    </div>
  )
}