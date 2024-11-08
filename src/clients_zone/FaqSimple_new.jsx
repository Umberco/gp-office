import { Container, Title, Accordion, Button, Divider, Alert } from '@mantine/core';
import classes from './FaqSimple.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '../Supabase';
import { useAuth } from '../context/AuthContext';
import { IconClipboardPlus } from '@tabler/icons-react';

import FaqForm from './FaqForm.jsx'

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
  const {isAuth} = useAuth()
  const [faqs, setFaqs] = useState(null)
  const [faq, setFaq] = useState(null)
  const [isEdited, setIsEdited] = useState(false)
  const [showInsert, setShowInsert] =  useState(false)
  const [hideInsertBtn, setHideInsertBtn] = useState(false)
  const [errorText, setErrorText] = useState(null)

    useEffect(
        () => {
            getFaqs()
        },
        []
    )

    const getFaqs = async () =>{
        const {data, error} = await supabase
            .from("faqs")
            .select()
            .eq("isActive", true)
            .order("created_at", {ascending: false})

            if (error !== null) {
                console.log(error.message)
                return
            }
            console.log(data)
            setFaqs(data)
    }

    const addFaq = async ({values}) =>{
      const {error} = await supabase
          .from("faqs")
          .insert({
            question: values.question,
            answer: values.answer,
          })

          if (error !== null) {
              console.log(error.message)
              return
          }
          console.log(data)
          getFaqs()
  }

    const deactivateFaq = async ({faqId}) =>{
      const {error} = await supabase
          .from("faqs")
          .update({isActive: false})
          .eq("id", faqId)

          if (error !== null) {
              console.log(error.message)
              return
          }
          console.log(data)
          getFaqs()
  }

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Často kladené dotazy
      </Title>
      {isAuth
            ?(hideInsertBtn === false
            ?<Button onClick={() => {setShowInsert(true); setHideInsertBtn(true)}} color='#4FC4E3' my="lg"><IconClipboardPlus/>Vložit novou otázku</Button>
            :<Button onClick={() => {setShowInsert(false); setIsEdited(false); setHideInsertBtn(false); setErrorText(null)}} color='grey' my="lg">Zpět</Button>
            )
            : <></>
        }
      {showInsert === true
                    ? <>
                    <FaqForm
                      question={""}
                      answer={""}
                      onSubmit={addFaq}
                      onDeactivate={deactivateFaq}
                    />
                      {
                        errorText === null ? <></> 
                        :(
                        <Alert variant="light" color="red" title="Chyba" my="md">
                            Chyba při odesílání. Zkontrolujte připojení k internetu a zkuste to prosím později.<br></br><br></br>
                            {errorText}
                        </Alert>
                        )
                      }
                    <Divider my="md" size="md"></Divider>
                    </>
                  : (
                      isEdited
                      ?<>
                      <FaqForm
                          question={faq.question}
                          answer={faq.answer}
                          onSubmit={addFaq}
                          faqId={faq.id}
                          onDeactivate={deactivateFaq}
                      />
                      {
                        errorText === null ? <></> 
                        :(
                        <Alert variant="light" color="red" title="Chyba" my="md">
                          {errorText}
                        </Alert>
                        )
                      }
                      <Divider my="md" size="md"></Divider>
                      </>
                      :<>
                      {
                        errorText === null ? <></> 
                        :(
                        <Alert variant="light" color="red" title="Chyba" my="md">
                          Chyba při odesílání. Zkontrolujte připojení k internetu a zkuste to prosím později.<br></br><br></br>
                          {errorText}
                        </Alert>
                        )
                      }
                      </>
                    )
      }
      <Accordion variant="separated">
      {faqs?.map((faq) => (
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>{faq.question}</Accordion.Control>
          <Accordion.Panel>{faq.answer}</Accordion.Panel>
        </Accordion.Item>
      ))
      }
      </Accordion>
    </Container>
  );
}

export default FaqSimple;