export default function TransactionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Transactions</h1>
      <p className="text-gray-400 text-sm mb-8">
        View your transaction history
      </p>

      <div className="bg-[#111916] border border-white/5 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-white/5 text-xs font-semibold text-gray-400 uppercase">
          <span>Type</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {/* Empty State */}
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-500">No transactions found.</p>
        </div>
      </div>
    </div>
  );
}
