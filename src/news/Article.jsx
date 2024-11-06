import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Loader, Button, Divider, Text } from '@mantine/core';
import { supabase } from '../Supabase';
import DateFormat from "./DateFormat"

import { useAuth } from '../context/AuthContext';
import ArticleForm from './ArticleForm';
import classes from "./Article.module.css"

import fp_placeholder_photo from "../assets/fp_placeholder_photo.svg";
import covidImg from "../assets/fp_vaccination_covid.jpg";
import newPatientsImg from "../assets/fp_new_patients.jpg";
import preventiveImg from "../assets/fp_preventive_programs.jpg";

const images = {
  "ockovani-proti-covid-19": covidImg,
  "prijimame-nove-pacienty": newPatientsImg,
  "preventivni-programy": preventiveImg
}

function ArticleDetail({article, onEdit}){
    const {isAuth} = useAuth()

    return(
        <>
        <h1>{article.title}</h1>
        <Text c="dimmed"><DateFormat dateTime={article.created_at}/></Text>
        <div className={classes.articleWrapper}>
            <div className={classes.imgWrapper}>
                {/* <img src={images[article.slug] ? images[article.slug] : fp_placeholder_photo} className={classes.articleImg}/> */}
                <img src={article.image !== null ? import.meta.env.VITE_SUPABASE_STORAGE + article.image : fp_placeholder_photo} className={classes.articleImg}/>
            </div>
            <div className={classes.textWrapper}>
            <p className={classes.articleText}>
                {article.body}<br></br>
            </p>
            {isAuth ?<Button onClick={onEdit} color='#4FC4E3'>Editovat</Button> : <></>}
            </div>
        </div>
        <Divider size="md" label="Další články"></Divider>
        </>
    )
}



function Article() {
    const {articleId} = useParams()
    const {isAuth} = useAuth()

    const [articles, setArticles] = useState(null)
    const [isEdited, setIsEdited] = useState(false)
    const [showInsert, setShowInsert] =  useState(false)
    const [hideInsertBtn, setHideInsertBtn] = useState(false)

    const navigate = useNavigate()


    useEffect(
        () => {
            getArticle()
        },
        [articleId]
    )

    const getArticle = async () =>{
        const {data, error} = await supabase
            .from("articles")
            .select()
            .eq("slug", articleId)
            .eq("isActive", true)
            .limit(1)
            .single()

            if (error !== null) {
                console.log(error.message)
                return
            }
            setArticles(data)
    }

    const addArticle = async ({values}) =>{
        try {
        //NULL IMAGE IMPORT CHECK
        let uploadedFileName;
          if (values.image !== null){
            console.log(values.image);
            const { data: dataImg, error: errorImg } = await supabase.storage
              .from("articles")
              .upload(values.image.name, values.image);
        
        //DUPLICATE IMAGE CHECK
        if (errorImg && errorImg.error === "Duplicate"){
          uploadedFileName = "articles/" + values.image.name
        } else {
        
        if (errorImg) {
          console.error("Image upload error:", errorImg);
          return;
        }
        uploadedFileName = dataImg.fullPath;
        }
            
            console.log(values);
            const { error } = await supabase
              .from("articles")
              .insert({
                title: values.title,
                description: values.description,
                body: values.body,
                image: uploadedFileName,
              });
            } else {
            const { error } = await supabase
            .from("articles")
            .insert({
              title: values.title,
              description: values.description,
              body: values.body,
            });
            }
        
            if (error) {
              console.error("Database insert error:", error.message);
              return;
            }
        
            getArticle();
            setShowInsert(false);
            setIsEdited(false);
            setHideInsertBtn(false);
          } catch (err) {
            console.error("Unexpected error:", err);
          }

    }

    const editArticle = async ({values, articleId}) => {
      try {
      //NULL IMAGE IMPORT CHECK
      let uploadedFileName;
      if (values.image !== null){

            console.log(values)
            console.log(articleId)
            console.log(values.image);
        const { data: dataImg, error: errorImg } = await supabase.storage
              .from("articles")
              .upload(values.image.name, values.image);
      //DUPLICATE IMAGE CHECK
            if (errorImg && errorImg.error === "Duplicate"){
              uploadedFileName = "articles/" + values.image.name
            } else {
            
            if (errorImg) {
              console.error("Image upload error:", errorImg);
              return;
            }
            uploadedFileName = dataImg.fullPath;
          }
        const {error} =  await supabase
            .from("articles")
            .update({
                title: values.title,
                description: values.description,
                body: values.body,
                image: uploadedFileName
            })
            .eq("id", articleId)
            console.log(error)

            if (error !== null) {
                console.log(error.message)
                return
            }
          } else {
            const {error} =  await supabase
            .from("articles")
            .update({
                title: values.title,
                description: values.description,
                body: values.body,
            })
            .eq("id", articleId)
            console.log(error)

            if (error !== null) {
                console.log(error.message)
                return

              }
           }
            getArticle()
            setShowInsert(false)
            setIsEdited(false)
            setHideInsertBtn(false)
          } catch (err) {
            console.error("Unexpected error:", err);
          }
    }

    const deactivateArticle = async ({articleId}) => {
      try {
        console.log(articleId)
        const { error} = await supabase
              .from("articles")
              .update({isActive: false})
              .eq("id", articleId)
  
              if (error !== null) {
                  console.log(error.message)
                  return
              }
              setShowInsert(false)
              setIsEdited(false)
              setHideInsertBtn(false)
              navigate('/news')
              location.reload();
            } catch (err) {
              console.error("Unexpected error:", err);
            }
            //TODO - doplnit navigate na obecnou obrazovku /news a doplnit tlačítko pro delete

      }




     
    return ( 
        <>
        <Container>
        {isAuth
            ?(hideInsertBtn === false
            ?<Button onClick={() => {setShowInsert(true); setHideInsertBtn(true)}} color='#4FC4E3' my="lg">Vložit nový článek</Button>
            :<Button onClick={() => {setShowInsert(false); setIsEdited(false); setHideInsertBtn(false)}} color='grey' my="lg">Zpět</Button>
            )
            : <></>
        }
        {   
            showInsert === true
            ? <>
              <ArticleForm
                title={""}
                description={""}
                body={""} 
                onSubmit={addArticle}
                onDeactivate={false}
              />
              <Divider my="md" size="md" label="Další články"></Divider>
              </>
            : articles === null
            ? <Loader color='cyan' size="lg" type='dots'/>
            : (
                isEdited
                ?<>
                <ArticleForm
                    title={articles.title}
                    description={articles.description}
                    body={articles.body}
                    onSubmit={editArticle}
                    articleId={articles.id}
                    onDeactivate={deactivateArticle}
                />
                <Divider my="md" size="md" label="Další články"></Divider>
                </>
                : <ArticleDetail article={articles} onEdit={() => {setIsEdited(true); setHideInsertBtn(true)}}/>
              )
            
        }
        </Container>
        </>
     );
}

export default Article;