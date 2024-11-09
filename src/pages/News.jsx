import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

import { ArticlesCardsGrid } from "../news/ArticlesCardsGrid";

function News() {
  return (
    <>
      <Container>
        <Outlet />
        <ArticlesCardsGrid home={false}></ArticlesCardsGrid>
      </Container>
    </>
  );
}

export default News;
