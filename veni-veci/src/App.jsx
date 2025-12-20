import { useState, useEffect } from 'react'
import './App.css'
import SkeletonBox from './components/SkeletonBox';

function App() {

  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([])
  const [imgUrl, setImgUrl] = useState('');

  async function fetchImage(params) {

    const url = 'https://api.thecatapi.com/v1/images/search'
    const api_key = import.meta.env.VITE_API_KEY
    // console.log(api_key)

    const config = {headers: {
      'x-api-key': api_key
    }}

    try {
      setLoading(() => {
        console.log("Loading...")
        return true})
      const response = await fetch(url, config)
      if (!response.ok){
        throw new Error(`HTTP ${response.status}`)
     
      }else{ 
      const data = await response.json()
      setFetchData(data)
      setLoading(() => {
      console.log("Loaded!")
      return false})
      setImgUrl(() => {
        return data[0].url
      })
      }
    } catch (e){
      console.log('Error Exception: ', e)
    }

  }

  useEffect(() => {
    setLoading(() => {
      console.log("Loading...")
      return true})
    fetchImage()
  }, [])

  return (
    <>
      <div className='main-container'>
        <div className='content'>
          <div className='img-container'>
            {loading ? <SkeletonBox />: imgUrl && <img className='cat-img' src={imgUrl}/>}
          </div>
              <button className='btn' onClick={fetchImage}>New Cat</button>
        </div>
      </div>

    </>
  )
}

export default App
