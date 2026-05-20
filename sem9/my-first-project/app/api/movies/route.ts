import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.OMDB_API_KEY

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const s = searchParams.get('s')
  const i = searchParams.get('i')

  let url = ''
  if (s) url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${s}`
  if (i) url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${i}`

  const response = await axios.get(url)
  return NextResponse.json(response.data)
}