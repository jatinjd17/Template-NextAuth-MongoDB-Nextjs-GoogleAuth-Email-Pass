"use client";

import axios from "axios";
import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response: any = await axios.post(
      "http://localhost:5000/api/createaccount",
      JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      {
        headers: {
          "Content-Type": "application/json",
          // You can add additional headers here if needed
        },
      }
    );

    const { data } = response;

    if (data.success) {
      console.log({ success: data.success });
    } else {
      console.log({ Error: data.error });
    }
    // const response = await fetch(`http://localhost:5000/api/createaccount`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email: formData.get("email"),
    //     password: formData.get("password"),
    //   }),
    // });
    // console.log({ response });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="email"
        className="border border-black text-black"
        type="email"
      />
      <input
        name="password"
        className="border border-black  text-black"
        type="password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
