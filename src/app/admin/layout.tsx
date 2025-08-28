
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminSidebar } from "@/components/AdminSidebar";

function AdminLayoutSkeleton() {
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
    // This check runs only on the client
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      setIsAuth(true);
    } else if (pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
     return <AdminLayoutSkeleton />;
  }

  // Allow login page to render without the full layout
  if (!isAuth && pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuth) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-background p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    );
  }

  // In the brief moment before the redirect happens,
  // we can show a skeleton or null.
  return <AdminLayoutSkeleton />;
}
