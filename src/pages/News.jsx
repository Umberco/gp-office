import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from "@mantine/core"

import { ArticlesCardsGrid } from '../ArticlesCardsGrid';

function News() {
    return ( 
    <>
    <Container>
    <Outlet/>
    <ArticlesCardsGrid>

    </ArticlesCardsGrid>

    </Container>
    </> 
);
}

export default News;