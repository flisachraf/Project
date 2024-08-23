import React, { useEffect, useState } from "react"
import { hero } from "../../../dummyData"
import "./hero.css"
import Card from "./Card"
import axios from "axios"

const Hero = () => {

  const [items, setIems] = useState(hero)
  useEffect(()=>{
    axios.get("http://localhost:8000/api/articles/confirmed/News")
    .then(res=>{
      console.log(res.data)
      // const lastFourItems = res.data.slice(-4).reverse(); // Get the last 4 items
      console.log(res.data)
      setIems(res.data);
    })
    .catch(err=>console.log(err))
  },[])

  return (
    <>
      <section className='hero'>
        <div className='container'>
          {items.map((item) => {
            return (
              <>
                <Card key={item._id} item={item} />
              </>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Hero
