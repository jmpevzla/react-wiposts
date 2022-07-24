import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import { Config } from "../types"
import { getConfigApi, setConfigApi } from '../data/configService'

export default ConfigView

function ConfigView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [config, setConfig] = useState<Config | null>(null)
  
  const formik = useFormik({
    initialValues: {
      theme: config?.theme || ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        setError('')

        await setConfigApi(values)
        
      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  })

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        setError('')

        const result = await getConfigApi()
        console.log(result)
        const info = result.info!
        
        setConfig(info)

      } catch(err) {
        const error = err as Error
        setError(error.message)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return (
    <section>
      <h1>Configuration</h1>

      <div>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <div>
            <label htmlFor="selectTheme"
              className="font-bold">Theme</label>
            <div>
              <select id="selectTheme"
                name="theme"
                className="select select-primary w-full max-w-xs"
                value={formik.values.theme}
                onChange={formik.handleChange}>
                <option value=""></option>
                <option value="light">&#127774; Light</option>
                <option value="dark">&#127768; Dark</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <button type="reset" 
              className="btn btn-warning">Cancel</button> |
            <button type="submit" 
              className="btn btn-success">Save</button>
          </div>
        </form>
      </div>

      <footer>
        <Link to="/" className="link">Go to Home</Link>
        <Link to="/profile" className="link">Go to Profile</Link>
      </footer>
    </section>
  )
}