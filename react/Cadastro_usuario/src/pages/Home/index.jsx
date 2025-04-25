import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [
    {
      id: 1,
      name: 'Lucas',
      age: 22,
      email: 'lucas@gmail.com'
    }
    ,
    {
      id: 2,
      name: 'Ana',
      age: 25,
      email: 'ana@gmail.com'
    }
    ,
    {
      id: 3,
      name: 'João',
      age: 30,
      email: 'joão@gmail.com',
    }]

  return (

    <div className='container'>
      <form className='form'>
        <h1>Cadastro de Usuário</h1>
        <input name='nome' type="text" placeholder='Nome' />
        <input name='idade' type="number" placeholder='Idade' />
        <input name='email' type="email" placeholder='Email' />
        <button type='button'>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Trash} />
          </button>
        </div>
      ))}


    </div>

  )
}

export default Home
