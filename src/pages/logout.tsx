import nookies from "nookies";
import jwt from "jsonwebtoken";

export default function Logout() {
  return <div>Erro 404</div>;
}

export async function getServerSideProps(ctx: any) {
  const cookies = nookies.get(ctx);
  const token = cookies.USER_TOKEN;

  const response = await fetch("https://alurakut.vercel.app/api/auth", {
    headers: {
      Authorization: token,
    },
  });

  const { isAuthenticated } = await response.json();

  if (isAuthenticated) {
    nookies.destroy(ctx, "USER_TOKEN");
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
}
