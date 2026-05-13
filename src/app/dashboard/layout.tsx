import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { coerceLegacyStep, getBillingStatus } from "@/lib/api";
import DashboardNav from "@/components/dashboard/DashboardNav";
import TrialBanner from "@/components/dashboard/TrialBanner";
import ExpiredBlock from "@/components/dashboard/ExpiredBlock";

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
  const rawStep =
    (ws?.settings as { onboarding_step?: string } | null)?.onboarding_step ??
    "clients";
  const step = coerceLegacyStep(rawStep);
  if (step !== "complete") {
    redirect(`/onboarding/${step}`);
  }

  const userEmail = user.email ?? "";
  const userInitial = userEmail.charAt(0).toUpperCase();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const billing = session?.access_token
    ? await getBillingStatus(session.access_token).catch(() => null)
    : null;

  const isTrialExpired =
    billing?.status === "trialing" &&
    billing.trial_ends_at != null &&
    new Date(billing.trial_ends_at) < new Date();
  const isHardExpired = billing?.status === "canceled" || isTrialExpired;
  const showTrialBanner =
    !isHardExpired &&
    billing?.status === "trialing" &&
    billing.days_remaining != null &&
    billing.days_remaining <= 7;

  return (
    <>
      <DashboardNav userEmail={userEmail} userInitial={userInitial} />
      <main className="pt-16 min-h-screen">
        {showTrialBanner && (
          <TrialBanner daysRemaining={billing!.days_remaining!} />
        )}
        {isHardExpired ? (
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <ExpiredBlock />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>
    </>
  );
}
