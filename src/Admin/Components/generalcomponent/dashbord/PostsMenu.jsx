import React, { useState } from 'react';
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { PostAdd as PostAddIcon, ExpandLess, ExpandMore, Announcement as AnnouncementIcon, Publish as PublishIcon, Assignment as AssignmentIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function PostsMenu({ activePath }) {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const togglePostsMenu = () => setIsPostsOpen((prev) => !prev);

  return (
    <>
      <ListItem button onClick={togglePostsMenu}>
        <ListItemIcon><PostAddIcon /></ListItemIcon>
        <ListItemText primary="Posts" />
        {isPostsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isPostsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to="/posts/Announcements" selected={activePath === '/posts/Announcements'} sx={{ pl: 4 }}>
            <ListItemIcon><AnnouncementIcon /></ListItemIcon>
            <ListItemText primary="Announcements" />
          </ListItem>
          <ListItem button component={Link} to="/posts/Publishing-projects" selected={activePath === '/posts/Publishing-projects'} sx={{ pl: 4 }}>
            <ListItemIcon><PublishIcon /></ListItemIcon>
            <ListItemText primary="Publishing Projects" />
          </ListItem>
          <ListItem button component={Link} to="/posts/Form" selected={activePath === '/posts/Form'} sx={{ pl: 4 }}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary="Form" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

export default PostsMenu;
