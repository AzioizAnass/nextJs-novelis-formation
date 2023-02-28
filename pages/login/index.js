'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';;
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useLogin } from '../hooks/useLogin';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Image from '../ressources/19385.jpg';
import { useDispatch } from "react-redux";

import { login } from "../features/user"


export default function SignInSide() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const dispatch = useDispatch();
  const [alertToggle, setAlertToggle] = useState(false);
  const route = useRouter();
  const { error, isError, isLoading, isSuccess, mutate } = useLogin();


  const onSubmit = (data) => {
    console.log(data)
    dispatch(login(data))
    mutate(data)

    if (isError) {
      setAlertToggle(true)
    }


  }


  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${Image.src})`
        }}
        style={{}}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {alertToggle && <Alert severity="error" >  Email or password incorrect !</Alert>}
          <Avatar sx={{ m: 1, bgcolor: '#ff067e' }}>
            <LockOutlinedIcon style={{color:"white"}} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("username")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            

              <Grid container justifyContent="space-between" alignItems="center" direction="row">
                <Grid container item direction="column" xs={9}>
                <Grid item >
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signUp" variant="body2">
                    {"Don't have an account?"}
                  </Link>
                </Grid>
               </Grid>
                <Grid item>
                  <Button item variant="outlined" type="submit" sx={{ fontWeight: 'bold', fontSize: 15, paddingLeft: 3, textDecoration: "none", p: 1, borderRadius: 1}}>
                    Login
                  </Button>
                </Grid>
              </Grid>


          </Box>
        </Box>
      </Grid></Grid>
  );
}