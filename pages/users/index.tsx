import { useState } from "react";

function Users({ users }: any) {
  const [searchTitle, setSearchTitle] = useState("");

  const onChangeSearchText = (event: any) => {
    const query = event.target.value;
    setSearchTitle(query);
  };

  const search = () => {
    window.location.href = "/users?query=" + searchTitle;
  };

  return (
    <div>
      <input
        type="text"
        id="input-search"
        className="form-control"
        placeholder="Buscar"
        onChange={onChangeSearchText}
        value={searchTitle}
      />
      <button onClick={search}>Buscar</button>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index}>
            <a href="">{user.firstName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps(context: any) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  console.log(context);
  const query = context.query.query || "";

  const url = "https://dummyjson.com/users/search?q=" + query;

  const res = await fetch(url);
  const data = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users: data.users,
    },
  };
}

export default Users;
