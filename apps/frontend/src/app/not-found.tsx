'use client'

import { TriangleAlertIcon } from "lucide-react";

import { CenteredContainer, Message, Wrapper } from "./not-found.styles";

export default async function NotFound() {
  return (
    <Wrapper>
      <CenteredContainer>
        <TriangleAlertIcon size={64} />
        <h3>Products not found</h3>
        <Message bold large>
          The link might be corrupted.
        </Message>
        <Message>or the page may have been removed</Message>
      </CenteredContainer>
    </Wrapper>
  );
}
