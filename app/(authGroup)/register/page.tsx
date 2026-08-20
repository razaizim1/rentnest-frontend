import { RegistrationForm } from "../_components/RegistrationForm"

export type RegisterState = {
    success: boolean;
    message: string;
}

const RegisterPage = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="space-y-6 shadow-lg p-8 border rounded-lg w-full max-w-md">

          {/* FORM GENERIC TEXTS */}
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-3xl">Create your account</h1>
            <p className="text-gray-500">
              Choose a role and start using RentNest
            </p>
          </div>

          {/* FORM */}
          <RegistrationForm />

        </div>
      </div>
    </>
  )
}

export default RegisterPage