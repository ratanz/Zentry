import React from 'react'
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const links = [
  {href : 'https://twitter.com/ratanz_codes', icon : <FaTwitter />},
  {href : 'https://discord.gg/ratanz', icon : <FaDiscord />},
  {href : 'https://github.com/ratanz', icon : <FaGithub />},
  {href : 'https://linkedin.com/in/ratanrathod7', icon : <FaLinkedin />},
]

const Footer = () => {
  return (
  <footer className='w-screen bg-colors-violet-300 py-4 text-black px-10 '>
    <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
      <p className='text-center text-sm md:text-left'>
        &copy; {new Date().getFullYear()} Zentry. 
      </p>

      <div className='flex justify-center gap-4'>
        {links.map((link) => (
          <a href={link.href} key={link.href} target='_blank' rel='noreferrer' className='text-black transition-colors duration-300 ease-in-out hover:text-white'>
            {link.icon}
          </a>
        ))}
      </div>
      <a href="#privacy policy" className='text-center text-sm hover:underline md:text-right'>
        Privacy Policy
      </a>
    </div>
  </footer>
  )
}

export default Footer
