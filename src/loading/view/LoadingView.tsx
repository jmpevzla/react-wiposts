import styles from "./styles/Loading.module.css"

export default LoadingView

function LoadingView() {
  return (
    <section className="flex flex-col text-center select-none h-[calc(100vh_-_4rem)] justify-center">
      <h2 className="text-7xl font-extrabold mb-4">Loading</h2>
      <div className="mx-auto">
        <div className={styles['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
      </div>
    </section>
  )
}