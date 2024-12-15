const Filter = ({filter, onChange}) => {

    return (
        <>
            <label>find countries </label>
            <input value={filter} onChange={onChange}></input>
        </>
    )
}

export default Filter