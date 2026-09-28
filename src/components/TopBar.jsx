const MESSAGE = '• 10% DE DESCONTO NA PRIMEIRA COMPRA - CUPOM "BEMVINDO10" •'

function TopBar() {
  const items = Array(6).fill(MESSAGE)

  return (
    <div className="wz-topbar">
      <div className="wz-marquee">
        <div className="wz-marquee-track">
          {items.map((text, i) => (
            <span className="wz-marquee-item" key={`a-${i}`}>{text}</span>
          ))}
          {items.map((text, i) => (
            <span className="wz-marquee-item" key={`b-${i}`}>{text}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopBar
