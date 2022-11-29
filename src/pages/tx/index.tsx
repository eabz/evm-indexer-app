export default function Index() {
  return <div />
}

export async function getStaticProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  }
}
