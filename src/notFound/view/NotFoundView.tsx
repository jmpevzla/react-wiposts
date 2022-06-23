import { Link } from "react-router-dom"
import { Icon } from "@mdi/react"
import { mdiAlertCircle } from "@mdi/js"

export default NotFoundView

function NotFoundView() {
  return (
    <section className="flex flex-col text-center select-none h-[calc(100vh_-_4rem)] justify-center">
      <h1 className="text-9xl font-extrabold mb-4">404</h1>
      <div className="text-3xl font-bold mb-3 flex flex-row justify-center">
        <Icon path={mdiAlertCircle} size={1.5} /> 
        <p>Not Found</p>
      </div>
      <p className="italic font-bold">Ups! The page you are looking for does not exist.</p>
      <p className="italic font-bold">It might have been moved or deleted. </p> 
      <p className="italic font-bold">
        You can to go to <Link className="link" to={"/"}>home page</Link>
      </p>
    </section>
  )
}