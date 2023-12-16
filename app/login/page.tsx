import { getServerSession } from "next-auth";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  console.log(session);
  if (session) {
    redirect("/");
  }
  return <Form />;
}
