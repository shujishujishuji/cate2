import React from 'react';

import List from '@material-ui/core/List';

import { groupListItems } from '../common/listItems';

export default function Groups() {
    return (
        <div>
            <List>{groupListItems}</List>
        </div>
        )
}