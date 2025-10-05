import React from "react";
import { AuthLayout } from "./components/AuthLayout";
import { SignupForm } from "./components/SignupForm";
import "../styles/index.css"

export default function App() {
  return (
    <div className="d-flex justify-center">
      <AuthLayout title="Crie sua conta">
        <SignupForm />
      </AuthLayout>
    </div>
  );
};
