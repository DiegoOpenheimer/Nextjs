import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from 'next/router'

type User = {
    name: string,
    avatar_url: string,
    bio: string,
    html_url: string,
    followers: number,
    following: number,
}

type PropsProfile = {
    user: User,
}

const Profile: NextPage<PropsProfile> = ({ user }) => {

    const router = useRouter()

    if (router.isFallback) {
        return <h1 style={{textAlign: 'center'}}>Loading...</h1>
    }

    return (
        <main className="container" style={{margin: 16}}>
            <img src={user.avatar_url} className='profile-img avatar-img' />
            <div>
                <p>Name: {user.name}</p>
                <p>Bio: {user.bio}</p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>Link: <a href={user.html_url} target="__blank">{user.html_url}</a></p>
            </div>
        </main>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { name: 'diegoopenheimer' } },
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async context => {
    const { params } = context
    const response = await fetch(`https://api.github.com/users/${params.name}`)
    const user = await response.json()
    return {
        props: { user },
        revalidate: 10
    }
}

export default Profile