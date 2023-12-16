"use client";

import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default function DashboardPage() {
  const getses = async () => {
    const session = await getSession();
    console.log(session);
  };
  return (
    <div>
      <div>private dashboard page - you need to be logged in to view this</div>
      <button
        onClick={() => {
          getses();
        }}
        className="text-white"
      >
        getsessionnn
      </button>
    </div>
  );
}
