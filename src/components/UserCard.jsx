const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender, photoUrl, about } = user
    return (
        <div className="justify-center">
            <div className="card bg-base-300 w-96 shadow-sm my-5 flex justify-center">
            <figure>
                {console.log(photoUrl)}
                <img src={photoUrl} alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age + "," + gender}</p>}
                <div className="card-actions justify-center">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserCard