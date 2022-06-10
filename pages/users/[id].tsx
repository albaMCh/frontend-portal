import React, { useState } from "react";
import { useRouter } from "next/router";

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

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
/*export async function getServerSideProps(context: any) {
  const id = context.params.id;

  const url = "https://dummyjson.com/users/" + id;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      user: data,
    },
  };
}*/

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.users.map((user: any) => ({
    params: { id: String(user.id) },
  }));

  console.log("paths:", paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://dummyjson.com/users/${params.id}`);
  const user = await res.json();

  // Pass post data to the page via props
  return { props: { user } };
}

export default User;
