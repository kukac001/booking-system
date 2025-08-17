import { signIn } from "../auth";

const Login = () => {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <input
          name="email"
          placeholder="john@gmail.com"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="ml-5"
        />
        <button className="w-full" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
