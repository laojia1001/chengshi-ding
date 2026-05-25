export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`status-bar${light ? ' light' : ''}`}>
      <span>9:41</span>
      <div className="status-icons">
        <span>●●●●</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  )
}
