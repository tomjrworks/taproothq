import { createClient } from "@/lib/supabase/server";
import BillingCard from "@/components/dashboard/BillingCard";
import { getBillingStatus, type BillingStatus } from "@/lib/api";

export default async function BillingPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let billing: BillingStatus | null = null;
  if (session?.access_token) {
    billing = await getBillingStatus(session.access_token).catch(() => null);
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 font-serif text-2xl text-bark">billing</h1>
      {billing ? (
        <BillingCard billing={billing} />
      ) : (
        <p className="font-sans text-sm italic text-bark/40">
          billing details are unavailable right now.
        </p>
      )}
    </div>
  );
}
