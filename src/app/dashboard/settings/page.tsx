import { createClient } from "@/lib/supabase/server";
import DigestToggle from "@/components/dashboard/DigestToggle";
import LeaveTaprootDialog from "@/components/dashboard/LeaveTaprootDialog";
import DeleteAccountDialog from "@/components/dashboard/DeleteAccountDialog";
import { getDigestPref } from "@/lib/api";

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: ws } = await supabase
    .from("workspaces")
    .select("name, settings")
    .single();

  const workspace = ws?.name ?? "—";
  const email = user?.email ?? "—";
  const joined = user?.created_at
    ? new Date(user.created_at).toISOString().slice(0, 10)
    : "—";
  const persona =
    (ws?.settings as { persona?: string[] } | null)?.persona?.join(", ") ?? "—";

  // Server-fetch digest pref so DigestToggle renders without a flash.
  let digestInitialEnabled = true;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    try {
      const pref = await getDigestPref(session.access_token);
      digestInitialEnabled = pref.email_subscribed;
    } catch {
      // Fall back to the schema default — DigestToggle will revert on POST
      // failure if the user toggles before the row resolves.
      digestInitialEnabled = true;
    }
  }

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

      {/* Weekly digest */}
      <section className="mb-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — weekly digest —
        </p>
        <DigestToggle initialEnabled={digestInitialEnabled} />
      </section>

      <div className="mb-8 border-t border-bark/10" />

      {/* Danger zone */}
      <section>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — danger zone —
        </p>
        <div className="space-y-4">
          <div className="rounded-sm border border-bark/10 p-4">
            <p className="mb-1 font-sans text-sm text-bark">leave taproot</p>
            <p className="mb-4 font-sans text-xs text-bark/50">
              deletes your encrypted cloud mirror. your local markdown files and
              account stay.
            </p>
            <LeaveTaprootDialog />
          </div>
          <div className="rounded-sm border border-[#b45309]/20 p-4">
            <p className="mb-1 font-sans text-sm text-bark">delete account</p>
            <p className="mb-4 font-sans text-xs text-bark/50">
              deletes everything: cloud mirror, account, billing, sign-in. local
              files stay. irreversible.
            </p>
            <DeleteAccountDialog />
          </div>
        </div>
      </section>
    </div>
  );
}
