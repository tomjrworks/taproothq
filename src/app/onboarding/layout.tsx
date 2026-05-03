import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingShell } from "@/components/dashboard/onboarding-shell";

export default async function OnboardingLayout({
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
  const step = (ws?.settings as { onboarding_step?: string } | null)
    ?.onboarding_step;
  if (step === "complete") {
    redirect("/dashboard");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const productUrl =
    process.env.PRODUCT_API_URL ?? "https://connect.taproothq.com";

  const wsRes = await fetch(`${productUrl}/api/workspace`, {
    method: "POST",
    headers: { Authorization: `Bearer ${session.access_token}` },
  }).catch(() => null);

  if (!wsRes?.ok) {
    redirect("/sign-in?error=workspace_create_failed");
  }

  return <OnboardingShell>{children}</OnboardingShell>;
}
