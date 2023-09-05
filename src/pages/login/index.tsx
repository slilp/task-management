import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import LoginPage from "views/login/page/Login";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
