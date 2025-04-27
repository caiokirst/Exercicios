import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

 
  const inputNameRef = useRef()
  const inputAgeRef = useRef()
  const inputEmailRef = useRef()

  async function getUsers() {
    const response = await api.get('/users')
    setUsers(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  async function createUser() {
    const name = inputNameRef.current.value
    const age = inputAgeRef.current.value
    const email = inputEmailRef.current.value

    if (!name || !age || !email) {
      alert('Preencha todos os campos')
      return
    }

    await api.post('/users', {
      name,
      age,
      email
    })

    getUsers()

    inputNameRef.current.value = ''
    inputAgeRef.current.value = ''
    inputEmailRef.current.value = ''
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  return (

    <div className='container'>
      <form className='form'>
        <h1>Cadastro de Usuário</h1>
        <input name='nome' type="text" placeholder='Nome' ref={inputNameRef}/>
        <input name='idade' type="number" placeholder='Idade' ref={inputAgeRef}/>
        <input name='email' type="email" placeholder='Email' ref={inputEmailRef}/>
        <button type='button' onClick={createUser}>Cadastrar</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className='delete' onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}


    </div>

  )
}

export default Home
