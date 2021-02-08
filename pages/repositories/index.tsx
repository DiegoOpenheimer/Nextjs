import { GetServerSideProps, NextPage } from "next";

type PropsRepositorie = {
    repositories: RepositoryModel[],
    error: string
}

type RepositoryModel = {
    id: number,
    name: string,
    html_url: string,
    owner: {
        login: string,
        avatar_url: string,
    }
}

const Repositories: NextPage<PropsRepositorie> = ({ repositories, error }: PropsRepositorie) => {
    return (
        <main className="container" style={{margin: 16}}>
            <h1>Repositories</h1>
            {error && <p>{error}</p>}
            {!error && repositories.length && <div className="container">
                <img className="avatar-img" src={repositories[0].owner.avatar_url} style={{borderRadius: '50%', height: '120px', width: '120px'}} />
                <p>{repositories[0].owner.login}</p>
                </div>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {!error && repositories?.map(repository => {
                    return <div className="card container" style={{margin: 4, justifyContent: 'center', width: 300, padding: 4}} key={repository.id}>
                        <p>{repository.name}</p><a href={repository.html_url} target="__blank" style={{wordBreak: 'break-all', textAlign: 'center'}}>{repository.html_url}</a>
                    </div>
                })}
            </div>
        </main>
    )
}


export const getServerSideProps: GetServerSideProps = async context => {

    const { name } = context.query
    let error: string = null
    let repositories: RepositoryModel[] = []
    if (name) {
        const response = await fetch(`https://api.github.com/users/${name}/repos`)
        const data = await response.json()
        if (data.message) {
            error = data.message
        } else {
            repositories = data
        }
    }

    return {
        props: {
            repositories,
            error
        },
        redirect: !name && { statusCode: 301, destination: '/' }
    }
}


export default Repositories