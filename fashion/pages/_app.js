import Layout from "../../../testDjango/testDjangoReact/restapi/src/commons/layout"

export default function App({ Component, pageProps }) {
  return (
      <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}
