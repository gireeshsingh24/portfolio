export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-body">
      {label}
    </span>
  );
}
