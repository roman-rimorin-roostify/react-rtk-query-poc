import { useGetUsersQuery } from "./services/usersApi";

function App() {
  const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery();
  
  return (
    <div className="App">
      <h1>Welcome to React Redux Toolkit RTK Query</h1>
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((user, i) => <h1 key={user.id}>{user.firstName} {user.lastName}</h1>)}
    </div>
  );
}

export default App;
