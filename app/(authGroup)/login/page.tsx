import { cookies } from "next/headers";
import SignInFrom from "../_components/SignInFrom"
import { redirect } from "next/navigation";



const LoginPage = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    redirect("/");
  }
  return (

    <>

      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-6 shadow-lg p-8 border rounded-lg w-full max-w-md">

          {/* FORM GENERIC TEXTS */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-3xl">Welcome Back!</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          {/* FORM */}
          <SignInFrom></SignInFrom>

        </div>
      </div>
    </>
  )
}

export default LoginPage