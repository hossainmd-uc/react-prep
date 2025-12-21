import { useState, useEffect, useRef } from 'react'
import './App.css'
import SkeletonBox from './components/SkeletonBox';
import Cat from './components/Cat';
import Attributes from './components/Attributes';

function App() {

  const [bannedTerms, setBannedTerms] = useState([])

  const bannedTermsRef = useRef(bannedTerms);

  useEffect(() => {
      bannedTermsRef.current = bannedTerms;
    }, [bannedTerms]);

  const addBannedTerm = (term) => {
    if (!bannedTerms.includes(term)){
      setBannedTerms((prev)  => {
        return [...prev, term] 
      })
    }

  }

  const removeBannedTerm = (term) => {
    setBannedTerms(prev => prev.filter(t => t !== term))
  }

  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([])
  const [imgUrl, setImgUrl] = useState('');

  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function fetchImage() {

    const url = 'https://api.thecatapi.com/v1/images/search?has_breeds=1'
    const api_key = import.meta.env.VITE_API_KEY

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
        const catInfo = data[0].breeds[0]
        const attributes = [catInfo.name, catInfo.origin, ...catInfo.temperament.split(',')]

        console.log(attributes)

        console.log(bannedTermsRef.current)
        const containsBanned = attributes.some(attr => bannedTermsRef.current.includes(attr.trim()))
        console.log(containsBanned)

          
        if (containsBanned) {
          console.log("Loading New Cat!");
          await delay(2000)
          fetchImage()
        } else{
          setFetchData(data)
          setLoading(false)
          setImgUrl(data[0].url)

      }
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
