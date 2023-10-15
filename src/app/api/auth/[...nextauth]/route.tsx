import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: 'Iv1.2df6a24ab6e87483',
      clientSecret: 'd5822dc234c1a3f2cc53ac86bff8f644bef26144',
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      console.log(session, token);
      session.user.name = `${session?.user?.name}_${token?.sub}`;
      return session;
    },
  },
  secret: "default_secret_key",
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
