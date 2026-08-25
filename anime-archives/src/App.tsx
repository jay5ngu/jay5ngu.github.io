import { useEffect, useState } from 'react'
import './css/App.css'
import './css/book.css'
import './css/shelf.css'
import { type Show } from './types/shows'
import type { API } from './types/api'
import { hexToPastel, getSpineTextColor } from './helper/hexColor'

function App() {
  // User login tracker
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

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
    // Resolves to '/api/myShowsInfo' in dev, and 'https://yourdomain.com' in prod
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/myShowsInfo`;
    const payload = { user_id: 9 }

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Alert server that data is JSON
      },
      body: JSON.stringify(payload), // Convert object to JSON string})
    })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
          }
          return res.json()
        })
        .then((data: API) => {
          if (!data.success) {
            throw new Error(data.message || 'Unknown API error');
          }
          return data.data
        })
        .then((shows: Show[]) => {
          setMyAnimeList(shows)
          if (shows.length > 0) {
            setSelectedAnime(shows[0])
            setSelectedId(shows[0].id)
          }
        })
        .catch((err) => console.error('Error fetching users:', err))
        .finally(() => setIsLoading(false));


  }, [])

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
          {/* Login */}
          <div className="authArea">
            {isLoggedIn ? (
              <span className="welcomeText">Welcome, USERNAME</span>
            ) : (
              <button className="loginButton">Login</button>
            )}
          </div>
        </div>

        {/* Search Bar and Adding Shows */}
        <div className="actionsRow">
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

          <button className="addShowButton">+ Add Show</button>
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

        {/* Toggle Shelf to display book spines or show cover images */}
        <div className="shelfHeader">
          <span className="shelfLabel">On the shelf</span>
          <label className="viewToggle">
            <span className={!isCoverImage ? "toggleActive" : ""}>Spine</span>
            <input
              type="checkbox"
              checked={isCoverImage} // pre-selects check on first compilation
              onChange={() => setIsCoverImage(!isCoverImage)}
            />
            <span className="toggleTrack"><span className="toggleThumb" /></span>
            <span className={isCoverImage ? "toggleActive" : ""}>Cover</span>
          </label>
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
                  <span className='title'>{show.title.english}</span>
                </div>

                {/* Display book shelf as book spine */}
                <div className="spine" style={{ 
                  display: !isCoverImage ? 'block' : 'none' , 
                  '--spine-color': hexToPastel(show.coverImage.color, 55, 82),
                  '--spine-color-dark': hexToPastel(show.coverImage.color, 55, 68)
                } as React.CSSProperties}>
                  <span className="spineTitle" style={{'--spine-text-color': getSpineTextColor(show.coverImage.color)} as React.CSSProperties}>{show.title.english}</span>
                </div>
              </button>
            </section>
          ))}
        </div>
      </section>

    </>
  )
}

export default App