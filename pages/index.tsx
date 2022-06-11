import styles from "../styles/Common.module.scss";
import homeStyles from "../styles/Home.module.scss";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getUsersWithDaysUntilBirthday,
  sortUsers,
} from "../shared/utils/helpers";

import { IUser } from "../shared/models/User";
import { getUsuarios } from "../shared/middleware/usuarios.middleware";

import {
  onChangeSearchText,
  onSearchKeyPress,
  search,
} from "../shared/utils/search";

function Home({ users }: { users: IUser[] }) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState("");

  return (
    <div className={styles.grid}>
      <h1>Página de Inicio</h1>
      <div>
        <input
          type="text"
          id="input-search"
          className={styles["search-input"]}
          placeholder="Buscar"
          onChange={(e) => onChangeSearchText(e, setSearchTitle)}
          onKeyPress={(e) => onSearchKeyPress(e, router, searchTitle)}
          value={searchTitle}
        />
        <button
          className={styles["search-button"]}
          onClick={(e) => search(e, router, searchTitle)}
        >
          Buscar
        </button>
      </div>
      <ul className={styles["card-group"]}>
        {users.map((user: any, index: number) => (
          <li key={index} className={styles.card}>
            <Link href={"/usuarios/" + user.id}>
              <a>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.age}</p>
                <p>{user.birthDate}</p>
                <p>Días próximo cumpleaños: {user.daysUntilNextBirthDate}</p>
              </a>
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
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const response = await getUsuarios();

  let users = getUsersWithDaysUntilBirthday(response.data);
  sortUsers(users);

  users = users.slice(0, 10);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
}

export default Home;
