import { useState } from 'react'
import './css/App.css'
import './css/book.css'
import './css/shelf.css'

// Sample Backend Data (REMOVE LATER)
import animeList from './api/sample-data/myShows.json'

function App() {
  // Anime selection and shelf
  const [selectedAnime, setSelectedAnime] = useState(animeList[0])
  const [selectedId, setSelectedId] = useState(animeList[0].id)
  const [myAnimeList, setMyAnimeList] = useState(animeList)

  // For open book animation
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section className="page">
        {/* Website Title */}
        <div className="header">
          <h1>Anime Archives</h1>
          <p>{myAnimeList.length} titles on the shelf</p>
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
            <section key={show.id} className={show.id === selectedId ? "active" : ""}>
              <button onClick={() => {
                setSelectedAnime(show)
                setSelectedId(show.id)
                // setIsOpen(false)
              }}>
                <img src={show.coverImage.medium} alt={show.title.english} />
                {show.title.english}
              </button>
            </section>
          ))}
        </div>
      </section>

    </>
  )
}

export default App