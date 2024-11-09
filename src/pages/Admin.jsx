import React from 'react';
import { Container } from '@mantine/core';

import { AuthenticationForm } from '../admin/AutheticationForm';


function Admin () {
    return ( 
        <>
        <Container>
            <AuthenticationForm></AuthenticationForm>
        </Container>
        </> 
     );
}

export default Admin;