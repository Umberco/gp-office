import * as React from 'react';
import { AppShell, Burger, Group, UnstyledButton, Container, Menu, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './AppShellNav.module.css';

import { MainLogo } from './MainLogo';
import { Outlet, Link } from 'react-router-dom';

import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconCircleArrowUp,
} from '@tabler/icons-react';

export function AppShellNav() {
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
          <Link to="/" className={classes.navLink}><MainLogo>Ordinace Hradecká</MainLogo></Link>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <img src=''></img>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Link to="news" className={classes.navLink}><UnstyledButton className={classes.control}>AKTUALITY</UnstyledButton></Link>
              {/* <Link to="appointment" className={classes.navLink}><UnstyledButton className={classes.control}>KLIENTSKÁ ZÓNA</UnstyledButton></Link> */}
              <Link to="appointment" className={classes.navLink}>
                <Menu trigger="hover" openDelay={100} closeDelay={400}>
                  <Menu.Target><UnstyledButton className={classes.control}>KLIENTSKÁ ZÓNA</UnstyledButton></Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      OBJEDNÁNÍ
                    </Menu.Item>
                    <Menu.Item>
                      OTÁZKY A ODPOVĚDI
                    </Menu.Item>
                    <Menu.Item>
                      RECEPTY
                    </Menu.Item>
                    <Menu.Item>
                      ANAMNÉZA
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Link>
              <Link to="pricing" className={classes.navLink}><UnstyledButton className={classes.control}>CENÍK</UnstyledButton></Link>
              <Link to="services" className={classes.navLink}><UnstyledButton className={classes.control}>SLUŽBY</UnstyledButton></Link>
              <Link to="contact" className={classes.navLink}><UnstyledButton className={classes.control}>KONTAKT</UnstyledButton></Link>
            </Group>
          </Group>
        </Group>
        </Container>
        
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
              <Link to="news" className={classes.navLink} onClick={toggle}><UnstyledButton className={classes.control}>AKTUALITY</UnstyledButton></Link>
              <Link to="appointment" className={classes.navLink} onClick={toggle}><UnstyledButton className={classes.control}>KLIENTSKÁ ZÓNA</UnstyledButton></Link>
              <Link to="pricing" className={classes.navLink} onClick={toggle}><UnstyledButton className={classes.control}>CENÍK</UnstyledButton></Link>
              <Link to="services" className={classes.navLink} onClick={toggle}><UnstyledButton className={classes.control}>SLUŽBY</UnstyledButton></Link>
              <Link to="contact" className={classes.navLink} onClick={toggle}><UnstyledButton className={classes.control}>KONTAKT</UnstyledButton></Link>
      </AppShell.Navbar>

      <AppShell.Main pb="md">
        <Outlet />

      </AppShell.Main>

      <AppShell.Footer p="md" mt="md" ta="center">© Ordinace Hradecká s.r.o. MUDr. Tereza Hylmarová | vyrobil Ing. František Hylmar | Web používá technické cookies  
        <Button component='a' href='#' bg="white"><IconCircleArrowUp size={30} color='#81D2ED'/></Button>
      </AppShell.Footer>
    </AppShell>
  );
}