import FormSubmitButton from "../components/FormSubmitButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import * as bcrypt from "bcrypt";

export const metadata = {
  title: "Add User",
};

async function addUser(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    throw Error("missing required values");
  }

  await prisma.user.create({
    data: { name, email, password: await bcrypt.hash(password, 10) },
  });

  redirect("/");
}

const AddUserPage = () => {
  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">Sign Up Please</h1>
      <form action={addUser}>
        <input
          required
          placeholder="Name"
          name="name"
          type="text"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          placeholder="your email = username"
          name="email"
          type="email"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          placeholder="Password"
          name="password"
          type="password"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">sign up</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddUserPage;
