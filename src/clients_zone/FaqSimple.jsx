import { Container, Title, Accordion } from '@mantine/core';
import classes from './FaqSimple.module.css';

const placeholder1 =
  "Běžné příznaky chřipky zahrnují vysokou horečku, bolesti svalů, únavu, suchý kašel a bolesti hlavy. Nachlazení se obvykle projevuje rýmou, kýcháním, bolestmi v krku a mírnou horečkou. Pokud máte pochybnosti, je vždy nejlepší konzultovat své příznaky s lékařem.";
const placeholder2 =
  'Navštivte lékaře, pokud máte silné nebo neobvyklé bolesti hlavy, které se zhoršují nebo jsou doprovázeny dalšími příznaky, jako je zvracení, zmatenost, ztráta vědomí nebo problémy s viděním. Také pokud bolesti hlavy přetrvávají déle než několik dní nebo se často opakují.';
const placeholder3 =
  'Doporučená očkování pro dospělé zahrnují vakcíny proti chřipce, tetanu, záškrtu, černému kašli (Tdap), pneumokokům, hepatitidě B a lidskému papilomaviru (HPV). V závislosti na věku, zdravotním stavu a cestovních plánech mohou být doporučena i další očkování. Konzultujte se svým lékařem, které vakcíny jsou pro vás vhodné.';
const placeholder4 =
  'Ke snížení krevního tlaku přirozenou cestou můžete zkusit následující: pravidelně cvičit, udržovat zdravou váhu, omezit příjem soli, jíst vyváženou stravu bohatou na ovoce a zeleninu, omezit konzumaci alkoholu, přestat kouřit a zvládat stres pomocí relaxačních technik, jako je meditace nebo jóga.';
const placeholder5 =
  "Pro prevenci sezónních alergií můžete zkusit následující: vyhýbat se spouštěčům alergií, jako je pyl, udržovat okna zavřená během sezóny alergií, používat vzduchové filtry, pravidelně čistit domov, sprchovat se a převlékat se po pobytu venku, a užívat antihistaminika nebo jiné léky předepsané lékařem.";


export function FaqSimple() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Často kladené dotazy
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>Jaké jsou běžné příznaky chřipky a nachlazení?</Accordion.Control>
          <Accordion.Panel>{placeholder1}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>Kdy bych měl/a navštívit lékaře kvůli bolesti hlavy?</Accordion.Control>
          <Accordion.Panel>{placeholder2}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>Jaké očkování je doporučeno pro dospělé?</Accordion.Control>
          <Accordion.Panel>{placeholder3}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>Jak mohu zlepšit svůj krevní tlak přirozenou cestou?</Accordion.Control>
          <Accordion.Panel>{placeholder4}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>Jaké jsou nejlepší způsoby, jak předcházet sezónním alergiím?</Accordion.Control>
          <Accordion.Panel>{placeholder5}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}