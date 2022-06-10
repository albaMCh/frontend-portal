import React, { useState } from "react";
import { useRouter } from "next/router";

import { getUsuarios } from "../shared/middleware/usuarios.middleware";
import Link from "next/link";

import {
  onChangeSearchText,
  onSearchKeyPress,
  search,
} from "../shared/utils/search";

function Users({ users, query }: any) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState(query);

  const reset = (e: any) => {
    const newTitle = "";
    setSearchTitle(newTitle);
    search(e, router, searchTitle, true);
  };

  return (
    <div>
      <input
        type="text"
        id="input-search"
        className="form-control"
        placeholder="Buscar"
        onChange={(e) => onChangeSearchText(e, setSearchTitle)}
        onKeyPress={(e) => onSearchKeyPress(e, router, searchTitle)}
        value={searchTitle}
      />
      <button onClick={(e) => search(e, router, searchTitle)}>Buscar</button>
      <button onClick={reset}>Limpiar</button>
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index}>
            <Link href={"/usuarios/" + user.id}>
              <a>{user.firstName}</a>
            </Link>
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
