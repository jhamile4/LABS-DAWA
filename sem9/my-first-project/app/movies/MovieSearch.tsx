'use client'
import { useState } from 'react'
import axios from 'axios'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

interface MovieDetail {
  Title: string
  Year: string
  Poster: string
  Plot: string
  Director: string
  Actors: string
  Genre: string
  imdbRating: string
  Runtime: string
  Type: string
}

export default function MovieSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [selected, setSelected] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    const res = await axios.get(`/api/movies?s=${query}`)
    setResults(res.data.Search || [])
    setLoading(false)
    setSelected(null)
  }

  const getDetail = async (id: string) => {
    const res = await axios.get(`/api/movies?i=${id}`)
    setSelected(res.data)
    setModalOpen(true)
  }

  return (
    <div>
      {/* Buscador */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder="Buscar película o serie..."
          className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-400 outline-none text-gray-800 text-lg"
        />
        <button
          onClick={search}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-xl border-2 border-black transition"
        >
          🔍 Buscar
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-white font-semibold">Buscando...</p>
        </div>
      )}

      {/* Resultados */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => getDetail(movie.imdbID)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl p-3 cursor-pointer transition border-2 border-white/20 hover:border-yellow-400"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                alt={movie.Title}
                className="w-full h-56 object-cover rounded-lg mb-3"
              />
              <h3 className="text-white font-bold text-sm line-clamp-2">{movie.Title}</h3>
              <p className="text-yellow-300 text-xs mt-1">{movie.Year} · {movie.Type}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <p className="text-center text-white/70 mt-12 text-lg">No se encontraron resultados para "{query}"</p>
      )}

      {/* Modal de detalle */}
      {modalOpen && selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>
            <div className="flex gap-6">
              <img
                src={selected.Poster !== 'N/A' ? selected.Poster : '/no-poster.png'}
                alt={selected.Title}
                className="w-40 h-60 object-cover rounded-xl border-4 border-gray-200 flex-shrink-0"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selected.Title}</h2>
                <p className="text-gray-500 text-sm mt-1">{selected.Year} · {selected.Runtime} · {selected.Type}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selected.Genre.split(',').map((g) => (
                    <span key={g} className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full border border-black">
                      {g.trim()}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">{selected.Plot}</p>
                <p className="mt-3 text-sm text-gray-600"><strong>Director:</strong> {selected.Director}</p>
                <p className="text-sm text-gray-600"><strong>Actores:</strong> {selected.Actors}</p>
                <p className="mt-3 text-yellow-500 font-bold text-lg">⭐ {selected.imdbRating} / 10</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}