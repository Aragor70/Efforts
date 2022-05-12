import { Fragment, useEffect, useState } from 'react';
import create from './actions/create';
import { getAll } from './actions/get';
import Card from './components/Card';

import { ReactComponent as EffortsSvg} from './style/images/efforts-logo.svg'

const App = () => {
  
  const [tasks, setTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [formData, setFormData] = useState({
    title: ''
  })

  

  const getTasks = async (payload = null) => {

    setLoadingTasks(true)
    const res = await getAll(payload);

    setTasks(res.tasks)

    
    setLoadingTasks(false)
  }

  useEffect(() => {

    getTasks()

    return () => {
      setTasks([]);
    }

  }, [])

  const handlCreate = async(e) => {
    try {
      const res = await create(formData)

      setTasks([res.task, ...tasks])
    } catch (err) {
      console.log(err.message)
    }
  }

  console.log(tasks)

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
          <form className="vertical-items" onSubmit={(e) => handlCreate(e)}>
            <label>
              <span>Start</span>
              <input type="date" />
            </label>
            <label>
              <span>End</span>
              <input type="date" />
            </label>
            <label>
              <button>Show only completed</button>
            </label>
          </form>

          {
            loadingTasks ? <div>loading...</div> : tasks.length ? tasks.map((element) => <Card key={element.id} element={element} tasks={tasks} setTasks={setTasks} />) : <div>No tasks.</div>
          }
        </section>
      </main>

    </Fragment>
  );
}

export default App;
