import React, { lazy, Suspense } from 'react'
import Navbar from '../../components/homecomponents/navbar/Navbar'
import Banner from '../../components/homecomponents/banner/Banner'
import requests from '../../constants/requests'
import Footer from '../../components/homecomponents/footer/Footer'

const Posters = lazy(() =>
  import('../../components/homecomponents/posters/Posters')
)


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Banner/>
      <Suspense fallback={<h1>Loading...</h1>}>

      {requests.map((item) => (

      <Posters
       key={item.title}
       title={item.title}
       fetchMovies={item.fetcher}
       />

      ))}

      </Suspense>

      <Footer/>


    </>
  )
}

export default HomePage
