import Image from "next/image";
import SignInForm from "./components/SignInForm";

const SignInFeature = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center ">
      <div className="w-full max-w-sm gap-6 flex flex-col ">
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.svg" alt="NAT PORTFOLIO" width={60} height={60} />
          <h1 className="text-2xl font-bold">NAT PORTFOLIO</h1>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInFeature;
