import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Loader,
  Button,
  Divider,
  Text,
  Alert,
  /* Dialog, */
} from "@mantine/core";
//import { useDisclosure } from '@mantine/hooks';
import { supabase } from "../Supabase";
import DateFormat from "./DateFormat";
import { IconClipboardPlus, IconEdit } from "@tabler/icons-react";

import { useAuth } from "../context/AuthContext";
import ArticleForm from "./ArticleForm";
import classes from "./Article.module.css";

import fp_placeholder_photo from "../assets/fp_placeholder_photo.svg";

function ArticleDetail({ article, onEdit }) {
  const { isAuth } = useAuth();

  return (
    <>
      <h1>{article.title}</h1>
      <Text c="dimmed">
        <DateFormat dateTime={article.created_at} />
      </Text>
      <div className={classes.articleWrapper}>
        <div className={classes.imgWrapper}>
          {/* <img src={images[article.slug] ? images[article.slug] : fp_placeholder_photo} className={classes.articleImg}/> */}
          <img
            src={
              article.image !== null
                ? import.meta.env.VITE_SUPABASE_STORAGE + article.image
                : fp_placeholder_photo
            }
            className={classes.articleImg}
          />
        </div>
        <div className={classes.textWrapper}>
          <p className={classes.articleText}>
            {article.body}
            <br></br>
          </p>
          {isAuth ? (
            <Button onClick={onEdit} color="#4FC4E3">
              <IconEdit />
              Editovat
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Divider size="md" label="Další články"></Divider>
    </>
  );
}

function Article() {
  const { articleId } = useParams();
  const { isAuth } = useAuth();

  const [articles, setArticles] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [hideInsertBtn, setHideInsertBtn] = useState(false);
  const [errorText, setErrorText] = useState(null);
  //const [opened, { toggle, close }] = useDisclosure(true);

  const navigate = useNavigate();

  useEffect(() => {
    getArticle();
  }, [articleId]);

  const getArticle = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select()
      .eq("slug", articleId)
      .eq("isActive", true)
      .limit(1)
      .single();

    if (error !== null) {
      console.log(error.message);
      //write error to global error message
      setErrorText(error.message);
      return;
    }
    setArticles(data);
    setErrorText(null);
  };

  const addArticle = async ({ values }) => {
    try {
      //NULL IMAGE IMPORT CHECK
      let uploadedFileName;
      let errorArticle;
      if (values.image !== null) {
        console.log(values.image);
        const { data: dataImg, error: errorImg } = await supabase.storage
          .from("articles")
          .upload(values.image.name, values.image);

        //DUPLICATE IMAGE CHECK
        if (errorImg && errorImg.error === "Duplicate") {
          uploadedFileName = "articles/" + values.image.name;
        } else {
          if (errorImg) {
            console.error("Image upload error:", errorImg);
            setErrorText(errorImg.message);
            return;
          }
          uploadedFileName = dataImg.fullPath;
        }
        //END OF IMAGE HANDLE
        console.log(values);
        const { error: errorArticle } = await supabase.from("articles").insert({
          title: values.title,
          description: values.description,
          body: values.body,
          image: uploadedFileName,
        });
      } else {
        const { error: errorArticle } = await supabase.from("articles").insert({
          title: values.title,
          description: values.description,
          body: values.body,
        });
      }

      if (errorArticle) {
        console.error("Database insert error:", error.message);
        setErrorText(errorImg.message);
        return;
      }

      getArticle();
      setShowInsert(false);
      setIsEdited(false);
      setHideInsertBtn(false);
      setErrorText(null);
      navigate("/news");
      location.reload();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const editArticle = async ({ values, articleId }) => {
    try {
      //NULL IMAGE IMPORT CHECK
      let uploadedFileName;
      if (values.image !== null) {
        console.log(values);
        console.log(articleId);
        console.log(values.image);
        const { data: dataImg, error: errorImg } = await supabase.storage
          .from("articles")
          .upload(values.image.name, values.image);
        //DUPLICATE IMAGE CHECK
        if (errorImg && errorImg.error === "Duplicate") {
          uploadedFileName = "articles/" + values.image.name;
        } else {
          if (errorImg) {
            console.error("Image upload error:", errorImg);
            setErrorText(errorImg.message);
            return;
          }
          uploadedFileName = dataImg.fullPath;
        }
        //END OF IMAGE HANDLE
        const { error } = await supabase
          .from("articles")
          .update({
            title: values.title,
            description: values.description,
            body: values.body,
            image: uploadedFileName,
          })
          .eq("id", articleId);
        console.log(error);

        if (error !== null) {
          console.log(error.message);
          setErrorText(error.message);
          return;
        }
      } else {
        const { error } = await supabase
          .from("articles")
          .update({
            title: values.title,
            description: values.description,
            body: values.body,
          })
          .eq("id", articleId);
        console.log(error);

        if (error !== null) {
          console.log(error.message);
          setErrorText(error.message);
          return;
        }
      }
      getArticle();
      setShowInsert(false);
      setIsEdited(false);
      setHideInsertBtn(false);
      setErrorText(null);
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorText("Unexpected error:", err.message);
    }
  };

  const deactivateArticle = async ({ articleId }) => {
    try {
      console.log(articleId);
      const { error } = await supabase
        .from("articles")
        .update({ isActive: false })
        .eq("id", articleId);

      if (error !== null) {
        console.log(error.message);
        setErrorText(error.message);
        return;
      }
      setShowInsert(false);
      setIsEdited(false);
      setHideInsertBtn(false);
      setErrorText(null);
      navigate("/news");
      location.reload();
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorText("Unexpected error:", err.message);
    }
  };

  return (
    <>
      {/*         
        DIALOG PRO ZOBRAZENI CHYBY - NICE TO HAVE
        <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
          <Alert variant="light" color="red" title="Alert title">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.
          </Alert>
        </Dialog> */}
      <Container>
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
              Vložit nový článek
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
            <ArticleForm
              title={""}
              description={""}
              body={""}
              onSubmit={addArticle}
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
            <Divider my="md" size="md" label="Další články"></Divider>
          </>
        ) : articles === null ? (
          <>
            <Loader color="cyan" size="lg" type="dots" />
            {errorText === null ? (
              <></>
            ) : (
              <Alert variant="light" color="red" title="Chyba" my="md">
                Chyba při načítání. Článek byl smazán nebo neexistuje.<br></br>
                <br></br>
                {errorText}
              </Alert>
            )}
          </>
        ) : isEdited ? (
          <>
            <ArticleForm
              title={articles.title}
              description={articles.description}
              body={articles.body}
              onSubmit={editArticle}
              articleId={articles.id}
              onDeactivate={deactivateArticle}
            />
            {errorText === null ? (
              <></>
            ) : (
              <Alert variant="light" color="red" title="Chyba" my="md">
                {errorText}
              </Alert>
            )}
            <Divider my="md" size="md" label="Další články"></Divider>
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
            <ArticleDetail
              article={articles}
              onEdit={() => {
                setIsEdited(true);
                setHideInsertBtn(true);
              }}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default Article;
