import './styles.css'

const UserCard = ({users}) => {

    const userInfo = users.map(user => {
        return (
            <div className='user-box'>
                <h1 className='username'>Nome: {user.name}</h1>
                <p className='info-card'>Nome de usuário: {user.username}</p>
                <p className='info-card'>Email: {user.email}</p>
            </div>
    )})

    return(
        <div>
            {userInfo}
        </div>
    )
}
export default UserCard