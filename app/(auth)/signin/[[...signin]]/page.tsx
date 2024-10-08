"use client";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <SignIn path="/signin"
        appearance={{ 
            elements: {
                footerAction:"hidden",
        }
      }}
      forceRedirectUrl="/dashboard"
      />
      <p className="text-center text-sm mt-4 max-w-prose">
        Vous n&apos;avez pas encore de compte ? <a className="text-blue-500 font-medium" href="/signup">Créez un compte</a>
      </p>
    </main>
  );
};

export default SignInPage;
 