import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoggedInLayout from "../layout/LoggedInLayout";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <LoggedInLayout sidebar={<Sidebar />} header={<Header />}>
      {children}
    </LoggedInLayout>
  );
}
