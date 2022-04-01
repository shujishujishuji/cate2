import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Link from '../../components/common/Link';
import GroupTab from '../../components/group/_group'

export default function GroupPage() {
    return (
        <GroupTab />
    );
  }


// レイアウトを適用する関数
export const getServerSideProps = async (context) => ({
props: {
    layout: true
}
})