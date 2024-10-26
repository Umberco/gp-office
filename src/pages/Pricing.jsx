import React from 'react';
import { Container } from '@mantine/core';

import { PricingTable } from '../PricingTable';

function Pricing() {
    return ( 
        <>
        <Container px="xl" mb="">
            <PricingTable></PricingTable>
        </Container>
        </>
     );
}

export default Pricing;