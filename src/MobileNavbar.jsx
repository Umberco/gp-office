import * as React from 'react';
import { AppShell, Burger, Group, UnstyledButton, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './MobileNavbar.module.css';

import { MainLogo } from './MainLogo';
import { HeaderSimple } from './HeaderSimple';
import { HeroImageRight } from './HeroImageRight';
import { ArticlesCardsGrid } from './ArticlesCardsGrid';
import { GetInTouch } from './GetInTouch';

export function MobileNavbar() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      //padding="md" -> removed because it made white borders around hero image
    >
      <AppShell.Header>
        <Container py="xs">
        <Group h="100%" px="md">
          <MainLogo>Ordinace Hradecká</MainLogo>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <img src=''></img>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>AKTUALITY</UnstyledButton>
              <UnstyledButton className={classes.control}>OBJEDNÁNÍ</UnstyledButton>
              <UnstyledButton className={classes.control}>CENÍK</UnstyledButton>
              <UnstyledButton className={classes.control}>SLUŽBY</UnstyledButton>
              <UnstyledButton className={classes.control}>KONTAKT</UnstyledButton>
            </Group>
          </Group>
        </Group>
        </Container>
        
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
            <UnstyledButton className={classes.control}>AKTUALITY</UnstyledButton>
            <UnstyledButton className={classes.control}>OBJEDNÁNÍ</UnstyledButton>
            <UnstyledButton className={classes.control}>CENÍK</UnstyledButton>
            <UnstyledButton className={classes.control}>SLUŽBY</UnstyledButton>
            <UnstyledButton className={classes.control}>KONTAKT</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main pb="md">
        <HeroImageRight>

        </HeroImageRight>
        <ArticlesCardsGrid>

        </ArticlesCardsGrid>
        <Container py="lg">
          <GetInTouch>

          </GetInTouch>
        </Container>

      </AppShell.Main>

      <AppShell.Footer p="md" ta="center">© Ordinace Hradecká s.r.o. MUDr. Tereza Hylmarová | vyrobil Ing. František Hylmar | Web používá technické cookies</AppShell.Footer>
    </AppShell>
  );
}