import moment from 'moment';
import { ReactComponent as CompleteSvg} from '../style/images/checkmark-done.svg'
import { ReactComponent as PendingSvg} from '../style/images/build-outline.svg'
import { Fragment, useEffect, useState } from 'react';
import update from '../actions/update';
import deleteOneById from '../actions/delete';

const Card = ({ element: { completed_at = null, createdAt, title, id }, tasks, setTasks }) => {

    const [formData, setFormData] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const [loadingTask, setLoadingTask] = useState(false)

    useEffect(() => {
        setFormData({ createdAt, title, id, completed_at})
    }, [])

    const handleUpdate = async(type) => {
        try {
            setLoadingTask(true)

            const res = await type ==='complete' ? await update({ isCompleted: true, id }) : await update({ title: formData.title, id})
            
            const refreshArray = await tasks.map((element) => element.id === res?.task?.id ? res.task : element)

            await setTasks(refreshArray)
            setOpenEdit(false)
            setLoadingTask(false)
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleDelete = async(tid) => {
        try {

            setLoadingTask(true)

            const res = await deleteOneById(tid)
            
            const refreshArray = await tasks.filter((element) => element.id !== res?.task?.id)

            await setTasks(refreshArray)
            setLoadingTask(false)
        } catch (err) {
            console.log(err.message)
        }
    }

  return (
    <div>
        {
            loadingTask ? <p>loading...</p> : <Fragment>

                <div className="status">
                    {
                        completed_at ? <Fragment><span>completed</span> <CompleteSvg /></Fragment> : <Fragment><span>pending</span> <PendingSvg /></Fragment>
                    }
                </div>
                <p>
                    {
                        moment(createdAt).format('DD-MM-YYYY hh:mm:ss')
                    }
                </p>
                <p>
                    {
                        openEdit ? <input type='text' value={formData.title || ''} onChange={(e) => setFormData({ title: e.target.value})} /> : title
                    }
                </p>
                <p className="gap20">
                    {
                        openEdit ? <button type="button" onClick={() => handleUpdate()}>Save</button> : <button type="button" onClick={() => handleUpdate('complete')}>Mark as {completed_at ? 'pending' : 'completed'}</button>
                    }
                    
                    <button type="button" onClick={() => setOpenEdit(!openEdit)}>{openEdit ? 'Cancel' : 'Edit'}</button>
                    {
                        !openEdit && <button type="button" onClick={() => handleDelete(id)}>Delete</button>
                    }
                    
                </p>
            </Fragment>
        }
        
    </div>
  );
}

export default Card;
