import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/common/Link';

export default function Mypage() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
          </Typography>
        </Box>
      </Container>
    );
  }


// レイアウトを適用する関数
export const getServerSideProps = async (context) => ({
props: {
    layout: true
}
})