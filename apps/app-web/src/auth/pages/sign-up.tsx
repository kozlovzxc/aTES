import { memo, useEffect } from "react";
import * as classes from "./sign-in.module.css";
import { useForm } from "react-hook-form";
import { signUpFx } from "../stores/auth.store";

export const SignUp = memo(() => {
  const {
    register,
    handleSubmit: useSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // TODO: add errors handling
    if (Object.keys(errors).length !== 0) {
      console.error(errors);
    }
  }, [errors]);

  const handleSubmit = useSubmit(async (data) => {
    await signUpFx({
      username: data.username,
      password: data.password,
    });
  });

  return (
    <>
      <h1 className={classes.title}>Sign Up</h1>
      {/* TODO: handle submit errors */}
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.form__label}>
          Username
          <br />
          <input
            type="text"
            autoComplete="username"
            {...register("username")}
          />
        </label>

        <label className={classes.form__label}>
          Password
          <br />
          <input
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
});
