'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Grid, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetArticlesPage } from '../hooks/useGetArticlesPage'
import PrimarySearchAppBar from '../Components/HomeMenuBar'
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux'
import { useGetUserFromToken } from '../hooks/useGetUserFromToken';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CoverImage from '../ressources/233288.png'
import BackgroundImage from '../ressources/23328.png'



const ArticlesPage = (props) => {

  const { isError, isLoading, pageArticles } = props;

  const router = useRouter()

  const handleCardChange = (articleId) => {
    router.push(`/article/${articleId}`)
  }

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography> Error</Typography>
  if (pageArticles) {
    return (
      <Container sx={{ paddingTop: 1, paddingBottom: 5 }} maxWidth="md">
        <Grid container spacing={4}>
          {pageArticles.content.map((article, articleId) => (
            <Grid item key={articleId} xs={12} sm={6} md={12}>
              <Card
                sx={{ height: 135, display: 'flex', flexDirection: 'column', backgroundColor: "#cb22d7", justifyContent: "flex-end" }}
              >
                <Box 
                sx={
                  {
                    backgroundImage: `url(${CoverImage.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                    justifyContent:"center",
                    width:"100%",height:"60%",
                    paddingBottom:7
                  }
                }></Box>
                
                <CardActionArea onClick={() => handleCardChange(article.articleId)}>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: "#fff6f6 ", fontWeight: "bold" }} align="center">
                      {article.titre}
                    </Typography>
                    <Typography style={{ color: "white" }}>
                      {article.articleContent ? article.articleContent.substring(0, 150) + "..." : " No content"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>)
  }
}


export default function Album() {

  const user = useSelector((state) => state.user.value)
  const token = useSelector((state) => state.token.value)

  const [pageId, setPageId] = React.useState(1)

  const {
    isLoading,
    isError,
    pageArticles
  } = useGetArticlesPage(pageId, 6);


  const handleChange = (event, value) => {
    setPageId(value)
  };

  return (

    <>
      <CssBaseline />
      <AppBar position="relative">
        <PrimarySearchAppBar />
      </AppBar>
      <main  >

        
        <Box minHeight={"100vh"}
          sx={
            {
              backgroundImage: `url(${BackgroundImage.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
              backgroundAttachment: "fixed",
            }
          }>
        </Box>
        <ArticlesPage isLoading={isLoading} isError={isError} pageArticles={pageArticles} />
        <Container style={{ paddingBottom: 20 }}>
          <Stack spacing={2} alignItems="center">

            {pageArticles && <Pagination count={pageArticles.totalPages} page={pageArticles.pageable.pageNumber + 1} onChange={handleChange} color="secondary" />}
          </Stack>
        </Container>
      </main>
    </>
  );

}