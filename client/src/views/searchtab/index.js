import React, { useState } from 'react'
import API from '../../api'



function SearchTab(){

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [tweets, setTweets] = useState([])

    async function handleSubmit() {
        setLoading(true)
        const response = await API.search.get('', { searchQuery: search })
        if (response.message == null) {
        const { tweets } = response
        const { statuses } = tweets
        console.log(tweets)
        setTweets(statuses ?? [])
        }
        setLoading(false)
    }

    return(
    <>
    {loading ? (
        <div>Fetching tweets...</div>
    ) : (
        <>
        <div>Search some tweets:</div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={handleSubmit}>
            Go
        </button>
        <hr />
        <div>Search result</div>
        {tweets.map((tweet) => {
            const hashtags = tweet?.entities?.hashtags ?? []
            return (
            <div key={tweet.id_str}>
                <div>Text: {tweet.text}</div>
                <div>Created at: {tweet.created_at}</div>
                <div>
                Hashtags: {hashtags.length > 0 ? hashtags.map((x) => x.text).join(', ') : 'None'}
                </div>
                <hr />
            </div>
            )
        })}
        </>
    )}

    </>)
}

export default SearchTab