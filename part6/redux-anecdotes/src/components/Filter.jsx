import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handlerChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    const style = {
        marginBottom: 15
    }

    return (
        <div style={style}>
            filter <input onChange={handlerChange}/>
        </div>
    )
}

export default Filter