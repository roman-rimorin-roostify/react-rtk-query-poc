import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers, useAddNewUserMutation, useGetUsersQuery, useLazyGetUsersQuery } from "./api/usersSlice";

function App() {
  const { error, isLoading, isSuccess, isError } = useGetUsersQuery();
  const [addNewUser, { isLoading : addUserIsLoading}] = useAddNewUserMutation();
  const [trigger, result, lastPromiseInfo] = useLazyGetUsersQuery();
  const users = useSelector(selectAllUsers)
  const [data, setData] = useState()

  console.log({result, lastPromiseInfo})

  useEffect(() => {
    const lazyTrigger = async () => {
      const lazy = await trigger()
      setData(lazy.data)
    }
    lazyTrigger()
  }, [trigger, addUserIsLoading])

  console.log("lazyTrigger", data) // to test the lazy trigger
  
  const handleAddUser = async (e) => {
    e.preventDefault();
    const formEntries = new FormData(e.target).entries();
    const json = Object.assign(...Array.from(formEntries, ([x,y]) => ({[x]:y})));
    const {firstName, lastName, jerseyNumber, team} = json

    if([firstName, lastName, jerseyNumber, team].every(Boolean) && !addUserIsLoading) {
      try{
        await addNewUser(json).unwrap()
      }catch(err){
        console.error('Failed to save the user',)
      }
    }
  }

  return (
    <div className="App">
      <h1>POC of React Redux Toolkit {"&"} RTK Query -{">"} CRUD Sample</h1>
      {isLoading && "Loading..."}
      {isError && error.message} 
      {isSuccess &&
        users && (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Jersey Number</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.jerseyNumber}</td>
                        <td>{user.team}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          )
        }
        <br/>
        <section className="form-section">
          <h3>Create User</h3>
          <form onSubmit={handleAddUser}>
            <label>First name:</label>
            <input type="text" name="firstName"/>
            <label>Last name:</label>
            <input type="text" name="lastName"/>
            <label>Jersey Number:</label>
            <input type="text" name="jerseyNumber"/>
            <label>Team:</label>
            <input type="text" name="team"/>

            <button type="submit" name="btn-add">Add</button>
            <button name="btn-clear">Clear</button>
          </form>
        </section>
    </div>
  );
}

export default App;
