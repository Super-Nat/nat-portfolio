"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "../ui/sonner";

const queryClient = new QueryClient();

const AdminProviders = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="2px"
        color="#000000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster position="bottom-right" />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default AdminProviders;
