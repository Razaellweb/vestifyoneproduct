export default function FAQ() {
  const faqs = [
    { q: "Is my money safe?", a: "Yes. We use bankgrade encryption and secure payment partners (Paystack/Flutterwave)." },
    { q: "How fast are loans?", a: "Approvals can take under 2 minutes within your collateral limit." },
    { q: "What is Ajo/Esusu?", a: "A trusted rotating savings group. Vestify automates reminders and payouts." },
  ];
  return (
    <div className="mt-[4rem] md:mt-[6rem]">
      <h2 className="text-2xl md:text-3xl">Frequently asked questions</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {faqs.map((f) => (
          <div key={f.q} className="card p-5">
            <h3 className="font-semibold">{f.q}</h3>
            <p className="text-sm text-muted mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
