import React from 'react'
import './index.css'
const SubLoader = ({state,trig,message}) => {
  return (
    <>
      <input type="checkbox" id='subloader' checked={state} />
      <section className='subLoader'>
        {
            !trig && (
                <div>
                    <main className='sub-spinner'></main>
                    <p>{message}</p>
                </div>
            )   
        }
        {
            trig && (
                <div>
                    <img src="https://img.freepik.com/free-vector/green-eco-loop-leaf-check-mark_78370-658.jpg?size=626&ext=jpg&ga=GA1.1.222711603.1699046896&semt=ais" width={60} height={60} alt="" srcset="" />
                    <p>{message}</p>
                </div>
            )
        }
      </section>
    </>
  )
}

export default SubLoader
