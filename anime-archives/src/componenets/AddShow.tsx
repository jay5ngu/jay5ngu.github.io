import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type Show } from '../types/shows'
import type { API } from '../types/api'

export default function AddShow() {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [addingId, setAddingId] = useState<number | null>(null)

  // Debounced search — waits for a pause in typing before calling the backend
  useEffect(() => {
    // If search bar is empty
    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    // Show loading page while waiting for search query
    setIsLoading(true)

    const timeoutId = setTimeout(() => {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/search/${encodeURIComponent(query.trim())}`

      fetch(apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`)
          }
          return res.json()
        })
        .then((data: API) => {
          if (!data.success) {
            throw new Error(data.message || 'Unknown API error')
          }
          return data.data
        })
        .then((shows: Show[]) => {
          setResults(shows)
          setHasSearched(true)
        })
        .catch((err) => console.error('Error searching shows:', err))
        .finally(() => setIsLoading(false))
    }, 400)

    // Returns a function to remove delay after search is completed
    return () => clearTimeout(timeoutId)
  }, [query])

  // Send API request to add show to user's list
  function handleAdd(show: Show) {
    setAddingId(show.id)
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/addShow`

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 9, show_id: show.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
            alert("Anime added to the archives!")
            navigate('/')
        }
        else {
            alert("An error occured while adding this anime")
        }
      })
      .catch((err) => console.error('Error adding show:', err))
      .finally(() => setAddingId(null))
  }

  return (
    <section className="page">
      <div className="header">
        <div className="headerText">
          <h1>Add a show</h1>
          <p>Search anime and TV to add to your shelf</p>
        </div>
        <Link to="/" className="loginButton">← Back</Link>
      </div>

      <div className="actionsRow">
        <div className="searchWrap">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a show or anime…"
            autoFocus
          />
        </div>
      </div>

      <div className="browseResults">
        {isLoading && <p className="browseStatus">Searching…</p>}

        {!isLoading && hasSearched && results.length === 0 && (
          <p className="browseStatus">No results for "{query}".</p>
        )}

        {!isLoading && results.length > 0 && (
          <div className="browseGrid">
            {results.map((show) => (
              <div key={show.id} className="browseCard">
                <img src={show.coverImage.medium} alt={show.title.english} />
                <p className="browseTitle">{show.title.english}</p>
                <button
                  className="addShowButton"
                  disabled={addingId === show.id}
                  onClick={() => handleAdd(show)}
                >
                  {addingId === show.id ? 'Adding…' : '+ Add to shelf'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}