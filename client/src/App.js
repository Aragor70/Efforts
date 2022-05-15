import { Fragment, useEffect, useState } from 'react';
import create from './actions/create';
import { getAll } from './actions/get';
import Card from './components/Card';

import { ReactComponent as EffortsSvg} from './style/images/efforts-logo.svg'
import { ReactComponent as FilterSvg} from './style/images/filter-outline.svg'
import { ReactComponent as CloseSvg} from './style/images/close-outline.svg'

const App = () => {
  
  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [formData, setFormData] = useState({
    title: ''
  })
  const [filterData, setFilterData] = useState(null)
  const [openFilter, setOpenFilter] = useState(false);

  

  const getTasks = async (payload = null) => {
    try {

      setLoadingTasks(true)
      
      const res = await getAll(payload);
  
      setTasks(res.tasks)
  
      
      setLoadingTasks(false)

    } catch (err) {
      
      setLoadingTasks(false)
    }
  }


  useEffect(() => {

    const defaultOption = { status: 'completed' }

    setFilterData(defaultOption)
    getTasks(defaultOption)

    return () => {
      setTasks([]);
    }

  }, [])

  const handlCreate = async(e) => {
    try {
      setLoadingTasks(true)
      const res = await create(formData)

      setTasks([res.task, ...tasks])
      setLoadingTasks(false)
    } catch (err) {

      setLoadingTasks(false)
      console.log(err.message)
    }
  }

  console.log(filterData)

  return (
    <Fragment>

      <header>
          <h1>
            <EffortsSvg /> Efforts
          </h1>
      </header>
      <main>
        <section className="vertical-items cards-items">

          <form className="vertical-items" onSubmit={(e) => handlCreate(e)}>
            <label>
              <p>
                Title
              </p>
              <p>
                Use letters, numbers, spaces, commas (,), dots (.), dashes (-), or underlines (_).
              </p>
              <input type="text" value={formData.title || ''} onChange={(e) => setFormData({title: e.target.value})} />

            </label>
            <button>
              Submit
            </button>
          </form>
          {
            openFilter ? 
              <form className="vertical-items">
              <div>
                <span onClick={() => setOpenFilter(false)} className='icon'>
                <CloseSvg />
                </span>
              </div>
              <label>
                <span>Start</span>
                <input type="date" onChange={(e) => setFilterData({...filterData, startDate: e.target.value})} />
              </label>
              <label>
                <span>End</span>
                <input type="date" onChange={(e) => setFilterData({...filterData, endDate: e.target.value})} />
              </label>
              <label>
                <div>
                  <input type="checkbox" checked={(filterData?.status === 'completed') || false} onChange={(e) => setFilterData({...filterData, status: e.target.checked ? 'completed' : 'pending'})} /> Show only {(filterData?.status === 'completed') ? 'pending' : 'completed'}
                </div>
              </label>
              <button type="button" onClick={() => setFilterData(null)}>
                Clear
              </button>
              <button type="button" onClick={() => getTasks(filterData)}>
                Show
              </button>
            </form> :
              <span onClick={() => setOpenFilter(true)} className='icon'>
                <FilterSvg />
              </span>
          }
          

          {
            loadingTasks ? <div>loading...</div> : tasks.length ? tasks.map((element) => <Card key={element.id} element={element} tasks={tasks} setTasks={setTasks} />) : filterData?.status ? <div>{"No " + (filterData?.status || "N/A") + " tasks."}</div> : <div>No tasks.</div>
          }
        </section>
      </main>

    </Fragment>
  );
}

export default App;
