export default function BlogWALoading() {
  return (
    <main style={{minHeight: '100vh', background: '#050d1a'}}>
      {/* Header skeleton */}
      <section style={{padding: '80px 20px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #0d1f3c 0%, #050d1a 100%)'}}>
        <div style={{width: '150px', height: '14px', background: '#1e3a5f', borderRadius: '4px', margin: '0 auto 12px'}}></div>
        <div style={{width: '300px', height: '48px', background: '#1e3a5f', borderRadius: '4px', margin: '0 auto 16px'}}></div>
        <div style={{width: '400px', height: '20px', background: '#1e3a5f', borderRadius: '4px', margin: '0 auto'}}></div>
      </section>

      {/* Cards skeleton */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px'}}>
          {[1,2,3].map(i => (
            <div key={i} style={{background: '#0d1f3c', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e3a5f'}}>
              <div style={{width: '100%', height: '200px', background: '#1e3a5f', animation: 'pulse 1.5s infinite'}}></div>
              <div style={{padding: '20px'}}>
                <div style={{width: '80px', height: '20px', background: '#1e3a5f', borderRadius: '20px', marginBottom: '12px'}}></div>
                <div style={{width: '100%', height: '24px', background: '#1e3a5f', borderRadius: '4px', marginBottom: '8px'}}></div>
                <div style={{width: '80%', height: '24px', background: '#1e3a5f', borderRadius: '4px', marginBottom: '16px'}}></div>
                <div style={{width: '100%', height: '60px', background: '#1e3a5f', borderRadius: '4px', marginBottom: '16px'}}></div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{width: '80px', height: '16px', background: '#1e3a5f', borderRadius: '4px'}}></div>
                  <div style={{width: '80px', height: '16px', background: '#1e3a5f', borderRadius: '4px'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}
