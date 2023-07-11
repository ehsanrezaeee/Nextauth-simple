import Image from "next/image";
import { f } from "../../lib/gettinguser";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default async function Card({ user, pagetype }: Props) {
  const greeting = user?.name ? (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
      Hello {user?.name}!
    </div>
  ) : null;

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null

  const userImage = user?.image ? (
    <Image
      className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      src={user?.image}
      width={200}
      height={200}
      alt={user?.name ?? "Profile Pic"}
      priority={true}
      unoptimized
    />
  ) : null;

  const users = await f();

  return (
    <section className="flex flex-col gap-4">
      {greeting}
      {/* {emailDisplay} */}
      {userImage}
      <p className="text-2xl text-center">{pagetype} Page!</p>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
        {users.length &&
          users.map(
            (user: {
              id: number;
              email: string;
              first_name: string;
              last_name: string;
              avatar: string;
            }) => {
              return (
                <div
                  key={user.id}
                  className="flex card items-center justify-center"
                >
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img
                    key={user.avatar}
                    src={user.avatar}
                    className="rounded-lg w-24"
                  />
                </div>
              );
            }
          )}
      </div>
    </section>
  );
}
