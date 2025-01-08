import React from "react";
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle"; 
import { formatDate } from '@fullcalendar/core'

export default function HeaderCalendar({ events }) {
    return (
        <Box sx={{ padding: 2 }}>
            {/* Instructions Section */}
            <Box sx={{ marginBottom: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Instructions
                </Typography>
                <List disablePadding sx={{ paddingLeft: 2 }}>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: "20px" }}>
                            <CircleIcon sx={{ fontSize: "8px" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Select dates to create a new event."
                            primaryTypographyProps={{ fontSize: "14px" }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: "20px" }}>
                            <CircleIcon sx={{ fontSize: "8px" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Drag, drop, or resize events to adjust them."
                            primaryTypographyProps={{ fontSize: "14px" }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon sx={{ minWidth: "20px" }}>
                            <CircleIcon sx={{ fontSize: "8px" }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Click on your event to edit it, or click on others to view them."
                            primaryTypographyProps={{ fontSize: "14px" }}
                        />
                    </ListItem>
                </List>
            </Box>

            {/* All Events Section */}
            <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                    All Events ({events.length})
                </Typography>
                <List>
                    {events && events.map((event) => (
                        <HeaderEvents key={event.id} event={event} />
                    ))}
                </List>
            </Box>
        </Box>
    );
}

function HeaderEvents({ event }) {
    return (
        <ListItem key={event.id} sx={{ padding: 1 }}>
            <ListItemText
                primary={event.title}
                secondary={'Start at: ' + formatDate(event.startAt, { year: 'numeric', month: 'short', day: 'numeric' }) +
                    ", End at: " + formatDate(event.endAt, { year: 'numeric', month: 'short', day: 'numeric' })}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{ fontStyle: "italic" }}
            />
        </ListItem>
    );
}
