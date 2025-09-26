import { PiggyBank, ShieldCheck, Users, HandCoins } from "lucide-react";
export default function Features() {
  const items = [
    { icon: PiggyBank, title: "Automated savings", desc: "Set it and grow, with controls that fit your income." },
    { icon: HandCoins, title: "Instant loans", desc: "Up to 80% of your savingsfast and fair." },
    { icon: Users, title: "Ajo/Esusu circles", desc: "Join trusted groups with reminders and smart limits." },
    { icon: ShieldCheck, title: "Bankgrade security", desc: "Encrypted, audited, and transparent fees." },
  ];
  return (
    <div className="mt-[4rem] md:mt-[6rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <article key={title} className="card p-6 hover:translate-y-[-2px] transition-transform">
          <Icon className="w-6 h-6 text-[var(--primary)]" />
          <h3 className="mt-3 text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted mt-1">{desc}</p>
        </article>
      ))}
    </div>
  );
}
