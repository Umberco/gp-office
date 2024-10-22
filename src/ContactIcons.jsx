var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Text, Box, Stack, rem } from '@mantine/core';
import { IconIdBadge2, IconPhone, IconMapPin, IconAt } from '@tabler/icons-react';
import classes from './ContactIcons.module.css';
function ContactIcon(_a) {
    var { icon: Icon, title, description } = _a, others = __rest(_a, ["icon", "title", "description"]);
    return (<div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }}/>
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>);
}
const MOCKDATA = [
  //  { title: 'Ordinační hodiny', description: '7:00 – 15:00', icon: IconSun },
    { title: 'IČO', description: '123456789', icon: IconIdBadge2 },
    { title: 'Email', description: 'ordinacehk@gmail.com', icon: IconAt },
    { title: 'Telefon', description: '+420 777 888 999', icon: IconPhone },
    { title: 'Adresa', description: 'Gagarinova 587 Hradec Králové 500 03', icon: IconMapPin },

];

export function ContactIconsList() {
    const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item}/>);
    return <Stack>{items}</Stack>;
};
