import { useState, useEffect } from 'react'
import { list } from './data'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Carousel = () => {
  const [people, setPeople] = useState(list)
  const [currentPerson, setCurrentPerson] = useState(0)

  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson - 1 + people.length) % people.length
      return newPerson
    })
  }

  const nextSlide = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson + 1) % people.length
      return newPerson
    })
  }

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => {
      clearInterval(sliderId)
    }
  }, [currentPerson])

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className='slide'
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              visibility: currentPerson === personIndex ? 'visible' : 'hidden',
              opacity: currentPerson === personIndex ? 1 : 0,
            }}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        )
      })}

      <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type='button' className='next' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  )
}

export default Carousel
