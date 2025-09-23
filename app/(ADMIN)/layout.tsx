"use client"
import { NotAuthenticated } from "@/components/feautures/notAuthenticated";
import { ErrorState } from "@/components/feautures/showError";
import { Unauthorized } from "@/components/feautures/unauthorized";
import { Loader } from "@/components/ui/loaders";
import { LoadUser } from "@/lib/controllers/_loadUser";
import { useQuery } from "@/lib/server/client-hook";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminOnly = ({ children }: AdminLayoutProps) => {
  const { run, data: userData, error, status } = useQuery("getMe");
  if (status === "idle") {
    run();
  }
  if (!userData || status === "loading") {
    return (
      <Loader
        unLoad={!userData && status === "success"}
        loader="flip-text-loader"
        text="KADIAN ADMIN"
        loaderSize="fullscreen"
      />
    );
  }
  if (userData.statusCode === 401 ) return <Unauthorized />;
  if (!userData.data) return <NotAuthenticated />;
  if(error)return <ErrorState message={userData.message}/>
  return (
    <>
      <LoadUser
        pushData={userData.data}
        returnPage={children}
        returnBadAuth={<Unauthorized />}
      />
    </>
  );
};

export default AdminOnly;
