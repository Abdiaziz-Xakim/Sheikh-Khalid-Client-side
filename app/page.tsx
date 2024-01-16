"use client" 

// import Dashboard from "@/pages/dashboard";
import { useSession } from "next-auth/react";
import scss from "./Layout.module.scss";
import React from "react";
import LoginPagee from "./users/login/page";
import Dashboard from "./pages/dashboard";
// import LoginPage from "./LoginTest";

const Home: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={scss.main}> 
      {session && <Dashboard />}
      {!session && <LoginPagee />}
    </main>
  );
};

export default Home;