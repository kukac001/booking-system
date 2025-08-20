import { signIn } from "../auth";

const Login = () => {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          try {
            const email = formData.get("email");
            const password = formData.get("password");
            await signIn("credentials", {
              email,
              password,
              redirectTo: "/profile",
            });
          } catch (error) {
            console.log("Error", error);
            throw error;
          }
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
