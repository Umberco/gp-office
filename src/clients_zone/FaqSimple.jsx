import {
  Container,
  Title,
  Accordion,
  Button,
  Divider,
  Alert,
  Flex,
  Loader,
} from "@mantine/core";
import classes from "./FaqSimple.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../Supabase.js";
import { useAuth } from "../context/AuthContext.jsx";
import { IconClipboardPlus, IconEdit } from "@tabler/icons-react";

import FaqForm from "./FaqForm.jsx";

export function FaqSimple() {
  const { isAuth } = useAuth();
  const [faqs, setFaqs] = useState(null);
  //const [faq, setFaq] = useState(null)
  const [isEdited, setIsEdited] = useState(false);
  const [editedFaqId, setEditedFaqId] = useState(null);
  const [editedFaqAnswer, setEditedFaqAnswer] = useState("");
  const [editedFaqQuestion, setEditedFaqQuestion] = useState("");
  const [showInsert, setShowInsert] = useState(false);
  const [hideInsertBtn, setHideInsertBtn] = useState(false);
  const [errorText, setErrorText] = useState(null);

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select()
      .eq("isActive", true)
      .order("created_at", { ascending: false });

    if (error !== null) {
      console.log(error.message);
      setErrorText(error.message);
      return;
    }
    console.log(data);
    setErrorText(null);
    setFaqs(data);
  };

  const addFaq = async ({ values }) => {
    const { error } = await supabase.from("faqs").insert({
      question: values.question,
      answer: values.answer,
    });

    if (error !== null) {
      console.log(error.message);
      setErrorText(error.message);
      return;
    }
    getFaqs();
    setShowInsert(false);
    setIsEdited(false);
    setHideInsertBtn(false);
    setErrorText(null);
  };

  const editFaq = async ({ values, faqId }) => {
    const { error } = await supabase
      .from("faqs")
      .update({
        question: values.question,
        answer: values.answer,
      })
      .eq("id", faqId);

    if (error !== null) {
      console.log(error.message);
      setErrorText(error.message);
      return;
    }
    setShowInsert(false);
    setIsEdited(false);
    setHideInsertBtn(false);
    setErrorText(null);
    getFaqs();
  };

  const deactivateFaq = async ({ faqId }) => {
    const { error } = await supabase
      .from("faqs")
      .update({ isActive: false })
      .eq("id", faqId);

    if (error !== null) {
      console.log(error.message);
      setErrorText(error.message);
      return;
    }
    setShowInsert(false);
    setIsEdited(false);
    setHideInsertBtn(false);
    setErrorText(null);
    getFaqs();
  };

  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Často kladené dotazy
      </Title>
      {isAuth ? (
        hideInsertBtn === false ? (
          <Button
            onClick={() => {
              setShowInsert(true);
              setHideInsertBtn(true);
            }}
            color="#4FC4E3"
            my="lg"
          >
            <IconClipboardPlus />
            Vložit novou otázku
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowInsert(false);
              setIsEdited(false);
              setHideInsertBtn(false);
              setErrorText(null);
            }}
            color="grey"
            my="lg"
          >
            Zpět
          </Button>
        )
      ) : (
        <></>
      )}
      {showInsert === true ? (
        <>
          <FaqForm
            question={""}
            answer={""}
            onSubmit={addFaq}
            onDeactivate={false}
          />
          {errorText === null ? (
            <></>
          ) : (
            <Alert variant="light" color="red" title="Chyba" my="md">
              Chyba při odesílání. Zkontrolujte připojení k internetu a zkuste
              to prosím později.<br></br>
              <br></br>
              {errorText}
            </Alert>
          )}
          <Divider my="md" size="md"></Divider>
        </>
      ) : isEdited ? (
        <>
          <FaqForm
            question={editedFaqQuestion}
            answer={editedFaqAnswer}
            onSubmit={editFaq}
            faqId={editedFaqId}
            onDeactivate={deactivateFaq}
          />
          {errorText === null ? (
            <></>
          ) : (
            <Alert variant="light" color="red" title="Chyba" my="md">
              {errorText}
            </Alert>
          )}
          <Divider my="md" size="md"></Divider>
        </>
      ) : (
        <>
          {errorText === null ? (
            <></>
          ) : (
            <Alert variant="light" color="red" title="Chyba" my="md">
              Chyba při odesílání. Zkontrolujte připojení k internetu a zkuste
              to prosím později.<br></br>
              <br></br>
              {errorText}
            </Alert>
          )}
        </>
      )}
      <Accordion variant="separated">
        {faqs === null ? (
          <>
            <Loader color="cyan" size="lg" type="dots" />
            {errorText === null ? (
              <></>
            ) : (
              <Alert variant="light" color="red" title="Chyba" my="md">
                Chyba při načítání. Zkontrolujte připojení k internetu a zkuste
                to prosím později.<br></br>
                <br></br>
                {errorText}
              </Alert>
            )}
          </>
        ) : (
          faqs?.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.question}
              className={classes.item}
            >
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
              {isAuth ? (
                <Flex justify="flex-end">
                  <Button
                    onClick={() => {
                      setIsEdited(true);
                      setHideInsertBtn(true);
                      setEditedFaqAnswer(faq.answer);
                      setEditedFaqId(faq.id);
                      setEditedFaqQuestion(faq.question);
                    }}
                    color="#4FC4E3"
                  >
                    <IconEdit />
                    Editovat
                  </Button>
                </Flex>
              ) : (
                <></>
              )}
            </Accordion.Item>
          ))
        )}
      </Accordion>
    </Container>
  );
}

export default FaqSimple;
