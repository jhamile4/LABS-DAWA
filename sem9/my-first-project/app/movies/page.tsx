import axios from 'axios'
import MovieSearch from './MovieSearch'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

async function getPopularMovies(): Promise<Movie[]> {
  const res = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=avengers`
  )
  return res.data.Search || []
}

export default async function MoviesPage() {
  const popular = await getPopularMovies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-white text-center mb-2 drop-shadow-lg">
          🎬 Galería de Películas y Series
        </h1>
        <p className="text-center text-white/60 mb-10">Powered by OMDb API</p>

        {/* Sección SSR — Películas populares */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white">Populares — SSR</h2>
            <span className="text-xs text-green-400 border border-green-400 px-2 py-1 rounded-full">
              Renderizado en servidor
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {popular.map((movie) => (
              <div key={movie.imdbID} className="bg-white/10 backdrop-blur rounded-xl p-3 border-2 border-white/20">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                  alt={movie.Title}
                  className="w-full h-52 object-cover rounded-lg mb-2"
                />
                <h3 className="text-white font-bold text-xs line-clamp-2">{movie.Title}</h3>
                <p className="text-yellow-300 text-xs">{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección CSR — Búsqueda */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white">Buscar — CSR</h2>
            <span className="text-xs text-blue-400 border border-blue-400 px-2 py-1 rounded-full">
              Renderizado en cliente
            </span>
          </div>
          <MovieSearch />
        </div>

      </div>
    </div>
  )
}