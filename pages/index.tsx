import React from 'react'
import { NextPage } from "next"
import { useRouter } from 'next/router'

type Request = {
  repositories: boolean,
  profile: boolean,
}

const Home: NextPage = () => {

  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState<string>()
  const [loadings, setLoadings] = React.useState<Request>({repositories: false, profile: false})
  const router = useRouter()

  const buildError = React.useCallback(() => {
    if (error) {
      return <span style={{color: 'red', marginTop: 5}}>{error}</span>
    }
  }, [error])

  const buildItem = React.useCallback((value: boolean, text: string) => {
    if (value) {
      return <h2>Loading...</h2>
    }
    return <h2>{text}</h2>
  }, [loadings])

  function submit(route: string, isPath: boolean = false): () => void {
    return () => {
      if (!value) {
        setError('The field is required')
      } else {
        setLoadings({ ...loadings, [route.substring(1)]: true });
        const routeFinal = isPath ? `${route}/${value}` : `${route}?name=${value}` 
        router.push(routeFinal)
      }
    }
  }

  return (
    <main className="container">
      <h1>Github app</h1>
      <section style={{display: 'flex', width: '50vw', flexDirection: 'column'}}>
        <input value={value} onFocus={_=>setError(null)} onChange={e=>setValue(e.target.value)} style={{width: '100%', padding: 12, border: error && 'red 1px solid'}} placeholder="Enter name" type="text" />
        {buildError()}
      </section>
      <section style={{display: 'flex', flexWrap: 'wrap', marginTop: 16}}>
        <div onClick={submit('/repositories')} className="card center">
          {buildItem(loadings.repositories, 'Repositories')}
        </div>
        <div onClick={submit('/profile', true)} className="card center">
          {buildItem(loadings.profile, 'Profile')}
        </div>
      </section>
    </main>
  )
}

export default Home