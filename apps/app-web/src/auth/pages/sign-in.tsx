import { memo, useEffect } from "react";
import * as classes from "./sign-in.module.css";
import { useForm } from "react-hook-form";
import { signInFx } from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = memo(() => {
  const {
    register,
    handleSubmit: useSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: add errors handling
    if (Object.keys(errors).length !== 0) {
      console.error(errors);
    }
  }, [errors]);

  const handleSubmit = useSubmit(async (data) => {
    await signInFx({
      username: data.username,
      password: data.password,
    });
    navigate("/");
  });

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>Sign in</h1>
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
            Sign in
          </button>
        </form>
        <div>
          New? <Link to="/auth/sign-up">Create an account.</Link>
        </div>
      </div>
    </div>
  );
});
