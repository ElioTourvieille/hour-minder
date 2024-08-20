import { SignUp } from "@clerk/nextjs";

const SignupPage = () => {
  return (
    <main className="flex flex-col items-center">
      <SignUp
        path="/signup"
        appearance={{
          elements: {
            footerAction: "hidden",
          },
        }}
      />
      <p className="text-center text-sm mt-4 max-w-prose">
        Vous avez déjà un compte ? <a className="text-blue-500 font-medium" href="/signin">Connectez-vous</a>
      </p>
    </main>
  );
};

export default SignupPage;
