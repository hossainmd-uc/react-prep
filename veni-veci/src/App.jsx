import { useState, useEffect } from 'react'
import './App.css'
import SkeletonBox from './components/SkeletonBox';
import Cat from './components/Cat';
import Attributes from './components/Attributes';

function App() {

  const [bannedTerms, setBannedTerms] = useState([])

  const addBannedTerm = (term) => {
    if (!bannedTerms.includes(term)){
      setBannedTerms((prev)  => {
        return [...prev, term] 
      })
    }

  }

  const removeBannedTerm = (term) => {
    const idx = bannedTerms.indexOf(term)
    setBannedTerms(bannedTerms.splice(idx, 1))
  }

  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([])
  const [imgUrl, setImgUrl] = useState('');

  async function fetchImage(params) {

    const url = 'https://api.thecatapi.com/v1/images/search?has_breeds=1'
    const api_key = import.meta.env.VITE_API_KEY
    // console.log(api_key)

    const config = {headers: {
      'x-api-key': api_key
    }}

    try {
      setLoading(() => {
        return true})
      const response = await fetch(url, config)
      if (!response.ok){
        throw new Error(`HTTP ${response.status}`)
     
      }else{ 
      const data = await response.json()
      setFetchData(data)
      setLoading(() => {
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
      return true})
    fetchImage()
  }, [])

  return (
    <>
      <div className='main-container'>
        <div className='banned-section'>
          <h4>Banned Terms</h4>
        {
          
          bannedTerms.map((term) => {
            return (
              <>
                <button className='banned-btn' onClick={() => {removeBannedTerm(term)}}>{term}</button>
              </>
            )
          })

        }
        </div>
        <div className='content'>
          <div className='img-container'>
            {loading ? <SkeletonBox />: imgUrl && <Cat img={imgUrl}/>}
          </div>
             
              <button className='btn' onClick={fetchImage}>New Cat</button> 
        </div>
        
        <Attributes addBan={addBannedTerm} data={fetchData} />
      </div>
    </>
  )
}

export default App
