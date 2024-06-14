import nookies from 'nookies'


export async function getServerSideProps(ctx, value) {
  const cookies = nookies.get(ctx)

    nookies.set(ctx, 'fromGetInitialProps', value, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
        secure: true
    })
  return { cookies }
}