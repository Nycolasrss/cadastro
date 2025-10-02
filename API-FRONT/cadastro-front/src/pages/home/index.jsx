import { useEffect, useState, useRef } from 'react'
import './home.css'
import Trash from '../../assets/Trash.svg'
import api from '../../services/api.js'

function Home() {

  let [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()
  

  
  const [editingUser, setEditingUser] = useState()

  async function getUsers(){
      const usersFromApi = await api.get('/users')
      setUsers(usersFromApi.data)
      console.log(usersFromApi.data)
  }

  async function createUser() {
    const payload = {
      name: inputName.current?.value?.trim() ?? '',
      email: inputEmail.current?.value?.trim() ?? '',
      age: Number(inputAge.current?.value) || 0,
     
    }

    console.log('createUser payload:', payload) // debug: verifique no console se os valores estão corretos

    try {
      await api.post('/users', payload)
      // limpa os inputs após criar (opcional)
      if (inputName.current) inputName.current.value = ''
      if (inputEmail.current) inputEmail.current.value = ''
      if (inputAge.current) inputAge.current.value = ''
      
      await getUsers()
    } catch (err) {
      console.error('Erro ao criar usuário:', err)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id) {
    await api.delete(`/users/${id}`)
    getUsers();
  }

  
  function startEdit(user) {
    setEditingUser({ ...user }) 
  }

  function cancelEdit() {
    setEditingUser(null)
  }

  async function putUser(id){
      try {
        await api.put(`/users/${id}`, {
          name: editingUser.name,
          email: editingUser.email,
          age: Number(editingUser.age)
        })
        setEditingUser(null)
        getUsers()
      } catch (err) {
        console.error('Erro ao atualizar usuário:', err)
      }
    }

  return (

    <div className="container">
      <form className="form">
        <h1>Cadastro de Clientes</h1>
        <input type="text" placeholder="Nome" ref={inputName}/>
        <input type="text" placeholder="Email" ref={inputEmail}/>
        <input type="text" placeholder="Idade" ref={inputAge}/>
        <button type="button" onClick={createUser}>Cadastrar</button>
      </form>
        {users.map((user) => (
          <div key={user.id} className="cards">
            {editingUser && editingUser.id === user.id ? (
              <div className="edit-card">
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <input
                  type="number"
                  value={editingUser.age}
                  onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })}
                />
                
                <button className="btn-save" onClick={() => putUser(user.id)}>Salvar</button>
                <button className="btn-cancel" onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
             <div className='criados'>
              <>
                 
               <div className="lista"> 
                  <p>Name:<span>{user.name}</span> </p>
                  <p>Email:<span>{user.email}</span> </p>
                  <p>age:<span>{user.age}</span></p>
                
               </div>
               <div className='buttons'> 
                  <button className="btn-delete" onClick={() => deleteUser(user.id)}>
                    <img src={Trash}/>
                  </button>
                    <button className="btn-edit" onClick={() => startEdit(user)}>
                      Editar
                    </button>
                </div>
               
              </>
           </div> 
          )}
            
        </div>
        ))}
    
      </div>
    

  )
}

export default Home