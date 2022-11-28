import 'swagger-ui-react/swagger-ui.css'

import dynamic from 'next/dynamic'

const SwaggerUI = dynamic<{
  url: any
  // @ts-ignore
}>(import('swagger-ui-react'), { ssr: false })

function ApiDoc() {
  return <SwaggerUI url="/api/doc" />
}

export default ApiDoc
