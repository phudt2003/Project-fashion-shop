export function SePayQRCode({ qrCodeUrl, amount, content }) {
  if (!qrCodeUrl) return null;

  return (
    <div className="space-y-3">
      <img className="h-64 w-64 rounded-md border bg-white p-3" src={qrCodeUrl} alt="SePay QR code" />
      <div className="text-sm text-slate-600">
        <p>Amount: {amount}</p>
        <p>Content: {content}</p>
      </div>
    </div>
  );
}

