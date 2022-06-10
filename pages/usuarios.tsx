import React, { useState } from "react";
import { useRouter } from "next/router";

import { getUsuarios } from "../shared/middleware/usuarios.middleware";

function Users({ users, query }: any) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState(query);

  const onChangeSearchText = (event: any) => {
    const query = event.target.value;
    setSearchTitle(query);
  };

  const onSearchKeyPress = (event: any) => {
    if (event.key === "Enter") {
      search(event);
    }
  };

  const reset = (event: any) => {
    const newTitle = "";
    setSearchTitle(newTitle);
    search(event, true);
  };

  const search = (event: any, reset?: boolean) => {
    const query = reset ? "" : searchTitle;
    let href = "/usuarios";

    if (query) {
      href += "?query=" + query;
    }

    event.preventDefault();
    router.push(href);
  };

  return (
    <div>
      <input
        type="text"
        id="input-search"
        className="form-control"
        placeholder="Buscar"
        onChange={onChangeSearchText}
        onKeyPress={onSearchKeyPress}
        value={searchTitle}
      />
      <button onClick={search}>Buscar</button>
      <button onClick={reset}>Limpiar</button>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index}>
            <a href={"/usuarios/" + user.id}>{user.firstName}</a>
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

  const query = context.query.query || "";

  const response = await getUsuarios({ query });

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users: response.data,
      query,
    },
  };
}

export default Users;
