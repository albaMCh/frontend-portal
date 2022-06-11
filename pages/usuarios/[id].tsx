import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  getUsuario,
  getUsuarios,
} from "../../shared/middleware/usuarios.middleware";

import styles from "../../styles/Common.module.scss";

import userStyles from "../../styles/User.module.scss";

function User({ user }: any) {
  const router = useRouter();

  const navigateToUserList = (e: any) => {
    e.preventDefault();
    router.push("/usuarios");
  };

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      <div className={styles["buttons-bar"]}>
        <button
          className={styles["return-button"]}
          onClick={navigateToUserList}
        >
          Volver
        </button>
      </div>
      <div className={userStyles["user-card"]}>
        <div>
          <label>Nombre:</label>
          <span>{user.firstName}</span>
        </div>
        <div>
          <label>Apellidos:</label>
          <span>{user.lastName}</span>
        </div>
        <div>
          <label>Edad: </label>
          <span>{user.age}</span>
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <span>{user.birthDate}</span>
        </div>
        <div>
          <label>Género:</label>
          <span>{user.gender}</span>
        </div>
        <div>
          <label>Número de teléfono:</label>
          <span>{user.phone}</span>
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = await getUsuarios();

  // Get the paths we want to pre-render based on posts
  const paths = response.data.map((user: any) => ({
    params: { id: String(user.id) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await getUsuario(params.id);

  // Pass post data to the page via props
  return { props: { user: response.data } };
}

export default User;
