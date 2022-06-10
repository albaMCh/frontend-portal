import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  getUsuario,
  getUsuarios,
} from "../../shared/middleware/usuarios.middleware";

function User({ user }: any) {
  const router = useRouter();

  return (
    <div>
      <div>Nombre: {user.firstName}</div>
      <div>Apellidos: {user.lastName}</div>
      <div>Edad: {user.age}</div>
      <div>Fecha de Nacimiento {user.birthDate}</div>
      <div>Género: {user.gender}</div>
      <div>Número de teléfono: {user.phone}</div>
      <div>Correo Electrónico: {user.email}</div>
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
