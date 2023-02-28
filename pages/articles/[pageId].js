'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetArticlesPage } from '../hooks/useGetArticlesPage'
import PrimarySearchAppBar from '../Components/HomeMenuBar'
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux'
import { useGetUser } from '../hooks/useGetUser';
import { useGetUserFromToken } from '../hooks/useGetUserFromToken';
import { useDispatch } from "react-redux";


export function getServerSideProps(context) {
  return {
    props: { params: context.params }
  };
}

const Content = (props) => {


  const queryClient = useQueryClient()
  React.useEffect(() => {
    queryClient.invalidateQueries("articlesByPage")
  })
  const router = useRouter()
  const {
    isLoading,
    isError,
    pageArticles
  } = props;
  const handleChange = (item) => {
    router.push(`/articles/${item}`)
  }
  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography> Error</Typography>
  if (pageArticles)

    return (
      <Pagination
        page={pageArticles.pageable.pageNumber + 1}
        count={pageArticles.totalPages}
        onChange={(_, value) => handleChange(value)}
      />
    );
}

const ArticlesPage = (props) => {

  const {
    isLoading,
    isError,
    pageArticles
  } = props;
  const router = useRouter()

  const handleCardChange = (articleId) => {
    router.push(`/article/${articleId}`)
  }
  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography> Error</Typography>
  if (pageArticles) {
    return (
      <Container sx={{ paddingTop: 14, paddingBottom: 5 }} maxWidth="md">
        <Grid container spacing={4}>
          {pageArticles.content.map((article) => (
            <Grid item key={article} xs={12} sm={6} md={12}>
              <Card
                sx={{ height: 135, display: 'flex', flexDirection: 'column', backgroundColor: "#ff067e", justifyContent: "flex-end" }}
              >
                <CardActionArea onClick={() => handleCardChange(article.articleId)}>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: "white ", fontWeight: "bold" }} align="center">
                      {article.titre}
                    </Typography>
                    <Typography style={{ color: "white" }}>
                      {article.articleContent ? article.articleContent.substring(0, 50) + "..." : " No content"}
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


export default function Album({ params }) {
  
  
  
  const user = useSelector((state) => state.user.value)
  
  const {
    isLoadingUserToken,
    isErrorUserToken,
    userToken
} = useGetUserFromToken();



  const { pageId } = params;
  const {
    isLoading,
    isError,
    pageArticles
  } = useGetArticlesPage(pageId, 6);

  return (

    <>    <CssBaseline />
      <AppBar position="relative">
        <PrimarySearchAppBar />
      </AppBar>
      <main >

        <ArticlesPage isLoading={isLoading} isError={isError} pageArticles={pageArticles} />
        <Container style={{ paddingBottom: 20 }}>
          <Stack spacing={2} alignItems="center">

            <Content isLoading={isLoading} isError={isError} pageArticles={pageArticles} />

          </Stack>
        </Container>
        <Button onClick={()=>console.log(user)}>click me</Button>
      </main>
    </>
  );

}