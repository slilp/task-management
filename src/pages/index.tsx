import type { GetServerSideProps } from "next";
import Home from "views/home/page/Home";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default Home;
