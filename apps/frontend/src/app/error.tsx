'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div
      style={{
        marginBlock: '5rem',
        marginInline: 'auto',
        padding: '2rem',
        border: '1px solid',
        borderColor: '#ffff',
        borderRadius: '0.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        width: 'fit-content',
      }}
    >
      <h1>Something went wrong...</h1>
      <pre style={{ color: '#e65100' }}>{error.message}</pre>
    </div>
  )
}
