'use client';
import React from 'react';
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  spec: Record<string, any>,
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;