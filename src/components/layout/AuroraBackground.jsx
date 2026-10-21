export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob -left-24 -top-24 h-96 w-96 bg-mint" />
      <div className="aurora-blob -right-24 top-1/3 h-[28rem] w-[28rem] bg-sky" style={{ animationDelay: '-6s' }} />
      <div className="aurora-blob -bottom-32 left-1/3 h-96 w-96 bg-coral" style={{ animationDelay: '-12s' }} />
      <div className="grain absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
