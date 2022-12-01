import 'swagger-ui-react/swagger-ui.css'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { createSwaggerSpec } from 'next-swagger-doc'

import { PageLayout } from '@/components/PageLayout'

const SwaggerUI = dynamic<{
  spec: Record<string, any>
  // @ts-ignore
}>(import('swagger-ui-react'), { ssr: false })

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PageLayout>
      <SwaggerUI spec={spec} />
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'src/pages/api',
    schemaFolders: ['src/types/models'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'EVM Indexer API docs',
        version: '1.0',
      },
    },
  })

  return {
    props: {
      spec,
    },
  }
}

export default ApiDoc
