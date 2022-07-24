import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { verifyEmailApi } from "../data/profileService"

export default VerifyEmailView

function VerifyEmailView() {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.token!

    async function load() {
      try {
        setIsLoading(true)
        setError('')
        await verifyEmailApi(token)
        navigate('/')
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
    </section>
  )
}