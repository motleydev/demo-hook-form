import React from "react";
import { useForm, Resolver } from "react-hook-form";

import "./styles.css";

type FormValues = {
  name: string;
  email: string;
  event: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: !values.name ? {} : values,
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required."
          }
        }
      : {}
  };
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: resolver
  });
  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  return (
    <div className="App">
      <h1>React Hook Form - Resolver</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input {...register("name")} placeholder="user" />
          {errors?.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} placeholder="user@domain.com" />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
