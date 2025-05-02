import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className='mt-2'>
       <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
     
      </motion.div>
    </div>
  )
}

export default Home
