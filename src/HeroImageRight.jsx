import * as React from 'react';
import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HeroImageRight.module.css';

export function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: '#4FC4E3', to: '#81D2ED' }}
              >
                Ordinace Hradecká
              </Text>
            </Title>

            <Text className={classes.description} mt={30}>
              MUDr. Tereza Hylmarová
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: '#4FC4E3', to: '#81D2ED' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Chci se objednat
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}