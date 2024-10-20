import * as React from 'react';
import { AppShell, Burger, Group, UnstyledButton, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './MobileNavbar.module.css';

import { HeaderSimple } from './HeaderSimple';
import { HeroImageRight } from './HeroImageRight';
import { MainLogo } from './MainLogo';

export function MobileNavbar() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <MainLogo>Ordinace Hradecká</MainLogo>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <img src=''></img>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        <HeroImageRight>

        </HeroImageRight>
      </AppShell.Main>

      <AppShell.Footer p="md" ta="center">© Ordinace Hradecká s.r.o. MUDr. Tereza Hylmarová | vyrobil Ing. František Hylmar | Web používá technické cookies</AppShell.Footer>
    </AppShell>
  );
}