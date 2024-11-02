import React from 'react';
import { Container } from '@mantine/core';

import { AuthenticationTitle } from '../admin/AuthenticationTitle';
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