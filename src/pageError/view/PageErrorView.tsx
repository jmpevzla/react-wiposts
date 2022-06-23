import { Icon } from "@mdi/react"
import { mdiFileAlert } from "@mdi/js"

export default PageErrorView

function PageErrorView({ error }: { error: string }) {
  return (
    <section className="flex flex-col text-center select-none h-[calc(100vh_-_4rem)] justify-center">
      <div className="text-7xl font-extrabold mb-4 flex flex-row justify-center">
        <Icon path={mdiFileAlert} size={3} /> 
        <p>Error</p>
      </div>
      <p className="italic font-bold text-error-content mb-3">{ error }</p>
      <p className="italic font-bold">
        <a className="link" onClick={() => window.location.reload()}>Reload Page Now</a>
      </p>
    </section>
  )
}