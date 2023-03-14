

'use client';

import React from 'react'

function ClientProvider({
    children
}: {
    children : React.ReactElement
}) {
  return (
    <>
      {children}
    </>
  )
}

export default ClientProvider













