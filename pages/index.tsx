import { useState } from "react";
import { useRouter } from "next/router";

import { daysUntilNext } from "../shared/utils/helpers";

import { IUser } from "../shared/models/User";

function Home2({ users }: { users: IUser[] }) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState("");

  const onChangeSearchText = (e: any) => {
    const query = e.target.value;
    setSearchTitle(query);
  };

  const search = (event: any) => {
    const href = "/users?query=" + searchTitle;
    event.preventDefault();
    router.push(href);
  };

  const onSearchKeyPress = (event: any) => {
    if (event.key === "Enter") {
      search(event);
    }
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
      <ul>
        {users.map((user: any, index: number) => (
          <li key={index}>
            <a href="">
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <p>{user.age}</p>
              <p>{user.birthDate}</p>
              <p>Días próximo cumpleaños: {user.daysUntilNextBirthDate}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  let users = data.users.map((user: any) => {
    const birthDate: Date = new Date(user.birthDate);
    user.daysUntilNextBirthDate = daysUntilNext(
      birthDate.getMonth() + 1,
      birthDate.getDate()
    );

    return user;
  });
  users.sort(function (a: any, b: any) {
    return a.daysUntilNextBirthDate - b.daysUntilNextBirthDate;
  });
  users = users.slice(0, 10);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
}

export default Home2;
