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
import { useForm } from "react-hook-form";
import { useQueryClient } from 'react-query';
import { useComment } from '../hooks/useComment';
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
    
    
    const { errorComment, isErrorComment, isLoadingComment, isSuccessComment, mutateComment } = useComment();

    const { id } = params
    const { isLoading, isError, article } = useGetArticleById(id);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const queryClient = useQueryClient()
    React.useEffect(() => {
        queryClient.invalidateQueries("articleById")
      })

    const onSubmit = (data) => {
     console.log(data)
     //const comment = {data , article : {articleId : articleId},utilisateur:{userid}}
    }

    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);

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
                            <Grid item xs={1} sx={{ backgroundColor: "#e42c64", borderTopLeftRadius: 10, borderTopWidth: "thin", borderColor: "black", justifyContent: "center" }}><Typography align="center"  variant="h4">{article.titre}</Typography></Grid>
                            <Grid item xs={11} sx={{ backgroundColor: "#614ad3", borderBottomLeftRadius: 10 }}>
                                <Typography sx={{ color: "white" , padding:2 }}>{article.articleContent}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={4} direction='column'>
                            <Grid container item xs={11} sx={{ backgroundColor: "#2d248a", borderTopRightRadius: 10 }} direction='column'></Grid>
                            <Grid container item xs={1} sx={{ backgroundColor: "#121b74", borderBottomRightRadius: 10 }} direction='row' >
                                <Box onSubmit={handleSubmit(onSubmit)} component="form" style={{justifyContent:"start", paddingLeft:10}}>
                                <TextField
                                    xs={8}
                                    id="commentContent"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{color:"white"}}>
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                    style={{height:5, marginBottom:2, input: { color: 'white' }}}
                                    {...register("commentContent")}
                                />
                                <Button item type="submit" xs={2}style={{width:'17%',height:'70%',marginLeft:20,marginTop:7}}  variant="contained" endIcon={<SendIcon />} size="large"> </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>



            </ThemeProvider>
        );
    }
}
