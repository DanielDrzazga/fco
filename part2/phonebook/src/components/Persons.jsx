const Persons = ({ persons, deletePerson }) => {
       return (
    <>
        {persons.map((person) => (
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
        ))}
    </>
    );
}

export default Persons;