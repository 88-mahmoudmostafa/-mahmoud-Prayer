



import { useState, useEffect } from 'react'
import Prayer from './component/prayer'
import './App.css'

function App() {
  const [prayertimes, setPrayertimes] = useState(null)
  const [city, setCity] = useState('Cairo')
  const [error, setError] = useState(null)

  const cities = [
    { name: 'القاهره', value: 'Cairo' },
    { name: 'الاسكندريه', value: 'Alexandria' },
    { name: 'المنصوره', value: 'Mansoura' },
    { name: 'اسوان', value: 'Aswan' },
    { name: 'الاقصر', value: 'Luxor' },
    { name: 'الجيزه', value: 'Giza' },
  ]

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setError(null)
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`
        )

        if (!res.ok) {
          throw new Error('API error: ' + res.status)
        }

        const data = await res.json()

        if (data?.data?.timings) {
          setPrayertimes(data.data.timings)
        } else {
          throw new Error('No timings found')
        }
      } catch (err) {
        console.error(err)
        setError(err.message)
      }
    }

    fetchPrayerTimes()
  }, [city])

  if (error) return <h2>في مشكلة: {error}</h2>
  if (!prayertimes) return <h2>جاري تحميل التوقيت...</h2>

  return (
    <section>
      <div className="container">

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c) => (
            <option className='open' key={c.value} value={c.value}>
            <h1> {c.name}</h1> 
            </option>
          ))}
        </select>

        <Prayer name="الفجر" time={prayertimes.Fajr?.split(" ")[0]} />
        <Prayer name="الظهر" time={prayertimes.Dhuhr?.split(" ")[0]} />
        <Prayer name="العصر" time={prayertimes.Asr?.split(" ")[0]} />
        <Prayer name="المغرب" time={prayertimes.Maghrib?.split(" ")[0]} />
        <Prayer name="العشاء" time={prayertimes.Isha?.split(" ")[0]} />

      </div>
    </section>
  )
}

export default App