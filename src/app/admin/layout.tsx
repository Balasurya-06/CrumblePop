
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [router, pathname]);

  // Don't protect the login page itself
  if (pathname === "/admin/login") {
    return <main className="flex-1 bg-background">{children}</main>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
