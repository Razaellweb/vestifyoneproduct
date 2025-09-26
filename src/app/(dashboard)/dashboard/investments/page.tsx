export default function InvestmentsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Curated Investments</h2>
        <p className="text-sm text-muted mt-1">Coming soon: lowrisk naira and dollar opportunities.</p>
      </div>
      <div className="card p-6">
        <h3 className="text-base font-medium">Get notified</h3>
        <form className="mt-3">
          <input className="w-full p-3 rounded-lg border border-base bg-transparent" placeholder="Your email" />
        </form>
      </div>
    </div>
  );
}
