const Persons = ({ personToShow, toogleDeleteOf }) => {
    return (
        <div>
            {personToShow.map(person =>
                <div key={person.name}>
                    {person.name} - {person.number}
                    <button onClick={() => toogleDeleteOf(person.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons