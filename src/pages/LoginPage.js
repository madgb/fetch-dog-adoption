import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../atoms/Input";
import Button from "../atoms/Button";

const LoginPage = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/search");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const loginInputs = [
    {
      id: "login-name-input",
      type: "text",
      placeholder: "Name",
      value: name,
      onChange: (e) => setName(e.target.value),
      className: "mb-2 p-2 border rounded w-full",
    },
    {
      id: "login-email-input",
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      className: "mb-2 p-2 border rounded w-full",
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {loginInputs.map(
        ({ id, type, placeholder, value, onChange, className }) => (
          <Input
            key={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
          />
        )
      )}
      <Button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded" children="Login"/>
    </div>
  );
};

export default LoginPage;
