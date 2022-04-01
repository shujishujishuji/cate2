import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/common/Link';
import Copyright from '../components/common/Copyright';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          メインページ
        </Typography>
        <Link href="/SignUp" color="secondary">
          アカウント登録
        </Link>
        <br />
        <Link href="/SignIn" color="secondary">
          サインイン
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}