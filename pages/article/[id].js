'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import PrimarySearchAppBar from '../Components/HomeMenuBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useGetArticleById } from '../hooks/useGetArticleById';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useQueryClient } from 'react-query';
import { useComment } from '../hooks/useComment';
import { useSelector } from 'react-redux'
import { useGetUserFromToken } from '../hooks/useGetUserFromToken';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
const theme = createTheme();


export function getServerSideProps(context) {
    return {
        props: { params: context.params }
    };
}
const ArticlePage = () => {
    return (<>
        <AppBar position="relative">
            <PrimarySearchAppBar />
        </AppBar>
    </>)

}

export default function Article({ params }) {


    const { errorComment, isErrorComment, isLoadingComment, isSuccess, mutate } = useComment();
    const user = useSelector((state) => state.user.value)
    const { id } = params
    const { isLoading, isError, article } = useGetArticleById(id);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const queryClient = useQueryClient()



    const [token, setToken] = React.useState(localStorage.getItem('token'))

    const {
        isLoadingUserToken,
        isErrorUserToken,
        userToken
    } = useGetUserFromToken(token)


    const onSubmit = (data) => {
        const commentContent = data.commentContent
        const comment = { commentContent: commentContent, article: { articleId: parseInt(id) }, utilisateur: { userid: userToken.userid } }
        mutate(comment)
        console.log(JSON.stringify(comment))
        console.log(comment)
        if (isErrorComment) {
            console.log("erreur a hamadi")
        }
        queryClient.invalidateQueries("articleById")

    }

    if (isLoading) { return <Typography color="white">Loading ...</Typography> }
    if (isError) { return <Typography color="white">Error !!!</Typography> }
    if (article) {
        return (
            <ThemeProvider theme={theme} >
                <CssBaseline />
                <ArticlePage />
                <Container sx={{ justifyContent: "center", marginTop: 12 }}>
                    <Grid container direction='row' sx={{ minHeight: 600, borderRadius: 20 }}>
                        <Grid container item direction='column' xs={8} >
                            <Grid item xs={1} sx={{ backgroundColor: "#421b9b", borderTopLeftRadius: 10, borderTopWidth: "thin", borderColor: "black", justifyContent: "center" }}>
                                <Typography align="center" variant="h4" style={{ color: "white" }}>{article.titre}</Typography>
                            </Grid>
                            <Grid item xs={11} sx={{ backgroundColor: "#a06ee1", borderBottomLeftRadius: 10 }}>
                                <Typography sx={{ color: "white", padding: 2 }}>{article.articleContent}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} direction='column'>
                            <Grid container xs={11} sx={{ borderTopRightRadius: 10, backgroundColor: "#cbbcf6" }} direction='column'>

                                <List item sx={{ marginTop: 0, width: "100%", maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "#cbbcf6", maxHeight: 550, overflow: 'auto' }}>

                                    {article.commentaires.sort().map((commentaire) => (<ListItem alignItems="flex-start" key={commentaire.commentId}>
                                        <ListItemAvatar>
                                            <Avatar alt={`${userToken.lastname}`} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            id={commentaire.commentId}
                                            primary={`${userToken.lastname} ${userToken.firstname}`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {commentaire.commentContent}
                                                    </Typography><Divider />
                                                </React.Fragment>

                                            }
                                        />
                                    </ListItem>))}
                                </List>
                            </Grid>

                            <Grid container item xs={1} sx={{ backgroundColor: "#421b9b", borderBottomRightRadius: 10, width: "92%", height: 10 }} direction='row' >
                                <Box onSubmit={handleSubmit(onSubmit)} component="form" style={{ justifyContent: "start", paddingLeft: 10 }}>
                                    <TextField
                                        xs={8}
                                        id="commentContent"
                                        color="info"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ color: "white" }}>
                                                    <AccountCircle />
                                                </InputAdornment>
                                            ),
                                        }}
                                        style={{ height: 5, marginBottom: 2, input : {color: 'white'}  }}
                                    {...register("commentContent")}
                                    />

                                    <Button item type="submit" xs={2} style={{ width: '17%', height: '70%', marginLeft: 7, marginTop: 7, backgroundColor: "#421b9b" }} variant="contained" endIcon={<SendIcon />} size="large"> </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>



            </ThemeProvider>
        );
    }
}
