import { signIn } from "../auth";

const Login = () => {
  return (
    <div className="flex items-center align-middle h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="m-auto p-3 w-2/3 bg-slate-400 rounded-lg">
        <h1 className="text-center text-3xl font-sans font-bold">Login</h1>
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
          <div className="flex flex-col">
            <label className="font-bold">E-mail</label>
            <input
              name="email"
              placeholder="john@gmail.com"
              type="email"
              required
              className="mt-2 p-1 rounded-sm bg-white"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-bold">Password</label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
              className="mt-2 p-1 rounded-sm bg-white"
            />
          </div>
          <div>
            <button
              className="mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 md:mt-5"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
