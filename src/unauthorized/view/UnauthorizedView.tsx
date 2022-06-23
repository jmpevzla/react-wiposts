import { Link } from "react-router-dom"
import { Icon } from "@mdi/react"
import { mdiLock } from "@mdi/js"

export default Unauthorizated

function Unauthorizated() {
  //const [progress] = usePageRedirect('/login')
  const progress = .5

  return (
    <section className="flex flex-col text-center select-none h-[calc(100vh_-_4rem)] justify-center">
      <h1 className="text-9xl font-extrabold mb-4">401</h1>
      <div className="text-3xl font-bold mb-3 flex flex-row justify-center">
        <Icon path={mdiLock} size={1.5} /> 
        <p>Unauthorizated</p>
      </div>
      <p className="italic font-bold">You don't have credentials for to be here, 
        please go to <Link className="link" to={"/login"}>login page</Link>
      </p>
      <div className="mx-auto">
        <p>In five seconds you will be redirect to login page...</p>
        <progress className="progress" value={progress} />
      </div>
    </section>
  )
}