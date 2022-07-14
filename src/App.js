import { useSelector } from 'react-redux'
import { selectAllUsers, useGetUsersQuery } from "./api/usersApi";

function App() {
  const { error, isLoading, isSuccess, isError } = useGetUsersQuery();
  const data = useSelector(selectAllUsers)
  return (
    <div className="App">
      <h1>POC of React Redux Toolkit {"&"} RTK Query -{">"} CRUD Sample</h1>
      {isLoading && "Loading..."}
      {isError && error.message} 
      {isSuccess &&
        data &&
        data.map((user, i) => <h1 key={user.id}>{user.firstName} {user.lastName}</h1>)}
    </div>
  );
}

export default App;
