export default function FAQ() {
  const faqs = [
    { q: "Is my money safe?", a: "Yes. We use bank‑grade security, BVN‑based KYC, and partner with trusted providers." },
    { q: "How fast are withdrawals?", a: "Most withdrawals settle within minutes via Paystack/Flutterwave." },
    { q: "How are loans calculated?", a: "You can access up to 80% of your savings instantly if eligible." },
  ];
  return (
    <div className="mt-[4rem] md:mt-[6rem]">
      <div className="w-[97%] mx-auto md:mx-0 md:w-[68%] left-0">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl text-center md:text-left">Questions, answered</h2>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {faqs.map((f, i) => (
          <div key={i} className="card p-5">
            <h3 className="font-semibold">{f.q}</h3>
            <p className="text-sm text-muted mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
