import { createClient } from "@/lib/supabase/server";
import DigestToggle from "@/components/dashboard/DigestToggle";
import LeaveTaprootDialog from "@/components/dashboard/LeaveTaprootDialog";
import BillingCard from "@/components/dashboard/BillingCard";
import { getBillingStatus, type BillingStatus } from "@/lib/api";

export default async function SettingsPage() {
  const supabase = createClient();
  const [
    {
      data: { user },
    },
    {
      data: { session },
    },
  ] = await Promise.all([supabase.auth.getUser(), supabase.auth.getSession()]);
  const { data: ws } = await supabase
    .from("workspaces")
    .select("name, settings")
    .single();

  let billing: BillingStatus | null = null;
  if (session?.access_token) {
    billing = await getBillingStatus(session.access_token).catch(() => null);
  }

  const workspace = ws?.name ?? "—";
  const email = user?.email ?? "—";
  const joined = user?.created_at
    ? new Date(user.created_at).toISOString().slice(0, 10)
    : "—";
  const persona =
    (ws?.settings as { persona?: string[] } | null)?.persona?.join(", ") ?? "—";

  return (
    <div className="max-w-xl">
      <h1 className="mb-8 font-serif text-2xl text-bark">settings</h1>

      {/* Account */}
      <section className="mb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — account —
        </p>
        <dl className="space-y-3">
          <div className="flex gap-4">
            <dt className="w-28 shrink-0 font-sans text-sm text-bark/50">
              workspace
            </dt>
            <dd className="font-sans text-sm text-bark">{workspace}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-28 shrink-0 font-sans text-sm text-bark/50">
              email
            </dt>
            <dd className="font-sans text-sm text-bark">{email}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-28 shrink-0 font-sans text-sm text-bark/50">
              joined
            </dt>
            <dd className="font-sans text-sm text-bark">{joined}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-28 shrink-0 font-sans text-sm text-bark/50">
              persona
            </dt>
            <dd className="font-sans text-sm text-bark">{persona}</dd>
          </div>
        </dl>
      </section>

      <div className="mb-8 border-t border-bark/10" />

      {/* Connected clients */}
      <section className="mb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — connected clients —
        </p>
        <p className="font-sans text-sm italic text-bark/40">
          no clients connected yet.
        </p>
      </section>

      <div className="mb-8 border-t border-bark/10" />

      {/* Billing */}
      {billing && (
        <section className="mb-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
            — billing —
          </p>
          <BillingCard billing={billing} />
        </section>
      )}

      {billing && <div className="mb-8 border-t border-bark/10" />}

      {/* Weekly digest */}
      <section className="mb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — weekly digest —
        </p>
        <DigestToggle />
      </section>

      <div className="mb-8 border-t border-bark/10" />

      {/* Danger zone */}
      <section>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — danger zone —
        </p>
        <div className="rounded-sm border border-bark/10 p-4">
          <p className="mb-1 font-sans text-sm text-bark">leave taproot</p>
          <p className="mb-4 font-sans text-xs text-bark/50">
            permanently delete your workspace and all associated data.
          </p>
          <LeaveTaprootDialog />
        </div>
      </section>
    </div>
  );
}
