import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const App = () => {
  
  // Lenis
  useEffect(() => {
    const lenis = new Lenis({
    })

    function raf(time: number) {
      lenis.raf(time)
    
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    

    // GSAP ScrollTrigger integration
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
