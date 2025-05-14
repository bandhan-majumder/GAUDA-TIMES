import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import { Lock } from "lucide-react";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.admin) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center gap-4 p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Lock className="h-14 w-14 text-red-600" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-red-400">Access Denied</h1>
              <p className="text-sm text-gray-500 md:text-base dark:text-gray-400">
                You do not have permission to access this page.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white border"
              href="/"
            >
              Return to the homepage
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
}
