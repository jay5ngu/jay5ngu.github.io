import { useEffect, useState } from 'react'
import './css/App.css'
import './css/book.css'
import './css/shelf.css'
import { type Show } from './types/shows'

// Sample Backend Data (REMOVE LATER)
// import animeList from './api/sample-data/myShows.json'

// User's anime collection
const [myAnimeList, setMyAnimeList] = useState<Show[]>([])

// Check if page is still loading
const [isLoading, setIsLoading] = useState(true)

// Anime selection and shelf
const [selectedAnime, setSelectedAnime] = useState<Show | null>(null)
const [selectedId, setSelectedId] = useState<number | null>(null)

// For open book animation
const [isOpen, setIsOpen] = useState(false)

// For book shelf display
const [isCoverImage, setIsCoverImage] = useState(false)

// For search bar functionality
const [query, setQuery] = useState('')
const [searchFocused, setSearchFocused] = useState(false)
const searchResults = query.trim() ? myAnimeList.filter((show) =>
    show.title.english.toLowerCase().includes(query.trim().toLowerCase())
  ) : []

// Backend API call to get user's shows
useEffect(() => {
  // Resolves to '/api/myShows' in dev, and 'https://yourdomain.com' in prod
  console.log(`${import.meta.env.VITE_API_BASE_URL}/myShows`)
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/myShows`;
  const payload = {
    user_id: 9
  }

  fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json', // Alert server that data is JSON
    },
    body: JSON.stringify(payload), // Convert object to JSON string})
  })
      .then((res) => res.json())
      .then((data: Show[]) => {
        setMyAnimeList(data)
        if (data.length > 0) {
          setSelectedAnime(data[0])
          setSelectedId(data[0].id)
        }
      })
      .catch((err) => console.error('Error fetching users:', err))
      .finally(() => setIsLoading(false));


}, [])

function App() {
  if (isLoading) return <div>Loading your archive…</div>
  if (!selectedAnime) return <div>No shows in your library yet.</div>
  return (
    <>
      <section className="page">
        <div className="header">
          {/* Website Title */}
          <div className="headerText">
            <h1>Anime Archives</h1>
            <p>{myAnimeList.length} titles in your library</p>
          </div>
          {/* Search Bar */}
          <div className="searchWrap">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)} 
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)} 
              placeholder="Search the stacks…" />
          
            {/* Search Results */}
            {searchFocused && query && (
              <div className="searchResults">
                {searchResults.length === 0 ? (
                  <p className="noResults">No matches in your library.</p>
                ) : (
                  searchResults.map((show) => (
                    <button
                      key={show.id}
                      className="searchResult"
                      onClick={() => {
                        setSelectedAnime(show)
                        setSelectedId(show.id)
                        // setIsOpen(false)
                        setQuery("")
                      }}
                    >
                      {show.title.english}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Anime/Show Book Info */}
        <div className="bookStage">
          {/* Content inside the book */}
          <div className="book">
            <div className="anime">
              <div className='leftPage'>
                <img src={selectedAnime.coverImage.large} alt={selectedAnime.title.english} />
              </div>
              <div className='rightPage'>
                {/* Button updates the isOpen state andtriggers the close functionality */}
                <button className="closeBook" onClick={() => setIsOpen(false)}>✕</button>
                <h2>{selectedAnime.title.english}</h2>
                <p className='meta'>Released {selectedAnime.startDate}</p>
                <p className='synopsis'>{selectedAnime.description}</p>
              </div>
            </div>

            {/* Front of Page with open/close functionality */}
            <div className="cover" style={{ transform: isOpen ? 'rotateY(-150deg) translateZ(0)' : 'rotateY(0deg) translateZ(0)' }} onClick={() => setIsOpen(!isOpen)}>
              <div className="coverFront">
                <h1>{selectedAnime.title.english}</h1>
                <p>click to open</p>
              </div>
              {/* <div className="coverBack"></div>  */}
            </div>
          </div>
        </div>

        {/* Shelf Anime/Show Selection */}
        <div className='shelf'>
          {myAnimeList.map((show) => (
            <section key={show.id} className={show.id === selectedId ? "active" : ""} style={{ width: isCoverImage ? '90px' : '54px' }}>
              <button onClick={() => {
                setSelectedAnime(show) // Set information for the selected anime
                setSelectedId(show.id) // Identify what to highlight for the selected anime on the shelf
              }}>

                {/* Display book shelf as anime cover image */}
                <div style={{ display: isCoverImage ? 'block' : 'none' }}>
                  <div className='coverImage'>
                    <img src={show.coverImage.medium} alt={show.title.english} />
                  </div>
                  <span>{show.title.english}</span>
                </div>

                {/* Display book shelf as book spine */}
                <div className="spine" style={{ display: !isCoverImage ? 'block' : 'none' }}>
                  <span className="spineTitle">{show.title.english}</span>
                </div>
              </button>
            </section>
          ))}
        </div>
        <label> Cover Image 
          <input type="checkbox" onChange={() => setIsCoverImage(!isCoverImage)} />
        </label>
      </section>

    </>
  )
}

export default App