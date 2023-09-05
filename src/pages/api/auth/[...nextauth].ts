import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const getAccount = (username: string, password: string) => {
  const users = [
    {
      id: "1",
      name: "Harry Potter",
      email: "harry@email.com",
      password: "harry1234",
      image: "/users/harry-profile.jpeg",
    },
    {
      id: "2",
      name: "Ron Weasley",
      email: "ron@email.com",
      password: "ron1234",
      image: "/users/ron-profile.jpeg",
    },
    {
      id: "3",
      name: "Hermione Granger",
      email: "hermione@email.com",
      password: "hermione1234",
      image: "/users/hermione-profile.jpeg",
    },
  ];

  return users.find(
    (user) => user.email === username && user.password === password
  );
};

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 24 * 60 * 60, //1 Day
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = getAccount(
          credentials?.username || "",
          credentials?.password || ""
        );

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
