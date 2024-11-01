import React from 'react';
import { Container } from '@mantine/core';

import { HeroImageRight } from '../index/HeroImageRight';
import { ArticlesCardsGrid } from '../news/ArticlesCardsGrid';
import { GetInTouch } from '../contact/GetInTouch';

function Home() {
    return ( 
        <>
        <HeroImageRight></HeroImageRight>
        <ArticlesCardsGrid home={true}></ArticlesCardsGrid>
        <Container py="lg">
            <GetInTouch>

            </GetInTouch>
        </Container>
        </>
     );
}

export default Home