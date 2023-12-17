import './Main.css';

const Main = () => {
  return (
    <>
      <section className="main-header" style={{height : (window.innerHeight - 83)}}>
        <div className="row-1">
          <span>Connecting Farmer's</span>
          <button className="btn"></button>
          <span>To Their Consumer's</span>
        </div>
        <div className="row-2">
          <span>Through Modern Technology</span>
        </div>
        <div className="row-3">
          <div className="col-1 col">
            <div className="card-header"></div>
          </div>
          <div className="col-2 col">
            <div className="card-header"></div>
          </div>
          <div className="col-3 col">
            <div className="card-header"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Main

