import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/dashboard/DashboardNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: ws } = await supabase
    .from("workspaces")
    .select("settings")
    .single();
  const step =
    (ws?.settings as { onboarding_step?: string } | null)?.onboarding_step ??
    "persona";
  if (step !== "complete") {
    redirect(`/onboarding/${step}`);
  }

  const userEmail = user.email ?? "";
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <>
      <DashboardNav userEmail={userEmail} userInitial={userInitial} />
      <main className="pt-16 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
