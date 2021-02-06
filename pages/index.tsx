import React from 'react'
import { NextPage } from "next"
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState<string>()
  const router = useRouter()

  const buildError = React.useCallback(() => {
    if (error) {
      return <span style={{color: 'red', marginTop: 5}}>{error}</span>
    }
  }, [error])

  function submit(route: string): () => void {
    return () => {
      if (!value) {
        setError('The field is required')
      } else {
        router.push(`${route}?name=${value}`)
      }
    }
  }

  return (
    <main className="container">
      <h1>Github app</h1>
      <section style={{display: 'flex', width: '50vw', flexDirection: 'column'}}>
        <input onFocus={_=>setError(null)} onChange={e=>setValue(e.target.value)} style={{width: '100%', padding: 12, border: error && 'red 1px solid'}} placeholder="Enter name" type="text" />
        {buildError()}
      </section>
      <section style={{display: 'flex', flexWrap: 'wrap', marginTop: 16}}>
        <div onClick={submit('/repositories')} className="card center">
          <h2>Repositories</h2>
        </div>
        <div onClick={submit('/profile')} className="card center">
          <h2>Profile</h2>
        </div>
      </section>
    </main>
  )
}

export default Home