import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Box, Button, CircularProgress, Dialog, TextField, Typography } from '@mui/material'
import HeaderCalendar from './HeaderCalendar'
import { addEvent, deleteEvent, fetchEvents, queryClient, updatedEvent } from '../../../../../util/httpsForUser/https'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { formatDate } from '@fullcalendar/core/index.js'
import { toast } from 'react-toastify'

// دالة لتحويل البيانات
function transformEvents(events) {
  return events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.startAt, // FullCalendar يمكنه التعامل مع الصيغتين ISO 8601
    end: event.endAt,
    allDay: event.allDay,
    extendedProps: {
      description: event.description,
      author: event.author,
    },
  }));
}
export default function Calendar() {
  const currentUser = JSON.parse(localStorage.getItem('userInfo'))?.user || {};
  const { workgroupId } = useParams();
  // Fetch events
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents({ workgroupId }),
  });

  // Mutations for add, edit, and delete
  const { mutate: addEventMutation } = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      toast.success('Added Event Successfully')
    },
  });

  const { mutate: editEventMutation } = useMutation({
    mutationFn: updatedEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      toast.success('Updated Event Successfully')
    },
  });

  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events'])
      toast.success('Deleted Event Successfully')
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent({
      startAt: selectInfo.startStr,
      endAt: selectInfo.endStr,
      allDay: selectInfo.allDay,
      title: '',
      description: '',
    });
    setDialogOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const isOwner = clickInfo.event.extendedProps.author === currentUser.userName;
    const event = {
      id: parseInt(clickInfo.event.id, 10),
      title: clickInfo.event.title,
      startAt: clickInfo.event.startStr,
      endAt: clickInfo.event.endStr,
      allDay: clickInfo.event.allDay,
      description: clickInfo.event.extendedProps.description || '',
      isOwner
    };
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleEventSubmit = () => {
    if (!selectedEvent?.title) {
      toast.error('Title is required');
      return;
    }
    const currentDate = new Date();
    const eventStartDate = new Date(selectedEvent?.startAt);
  
    // تحقق من أن تاريخ البداية بعد أو يساوي التاريخ الحالي
    if (eventStartDate < currentDate) {
      toast.error('The event start date cannot be before the current date.');
      return;
    }
    if (selectedEvent?.id) {
      editEventMutation(selectedEvent);
    } else {
      addEventMutation({ newEvent: selectedEvent, workgroupId });
    }
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = () => {
    if (selectedEvent?.id) {
      deleteEventMutation(selectedEvent.id);
    }
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEventChange = (changeInfo) => {
    const updatedEvent = {
      id: changeInfo.event.id,
      title: changeInfo.event.title,
      startAt: changeInfo.event.startStr,
      endAt: changeInfo.event.endStr,
      description: changeInfo.event.extendedProps.description || '',
      allDay: changeInfo.event.allDay,
    };
    const currentDate = new Date();
    const eventStartDate = new Date(updatedEvent?.startAt);
    // تحقق من أن تاريخ البداية بعد أو يساوي التاريخ الحالي
    if (eventStartDate < currentDate) {
      toast.error('The event start date cannot be before the current date.');
      return;
    }
    editEventMutation(updatedEvent);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const formattedEvents = transformEvents(events);
  return (
    <Box sx={{ boxShadow: 3, p: 3, mr: 5, mb: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
      <HeaderCalendar events={events} />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={formattedEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        eventRemove={(removeInfo) => deleteEventMutation(removeInfo.event.id)}
      />

      {/* Dialog for Adding/Editing Events */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box sx={{ p: 3, minWidth: '400px' }}>
          {selectedEvent?.id && !selectedEvent.isOwner ? <EventDetails event={selectedEvent} setDialogOpen={setDialogOpen} /> :
            <>
              <Typography variant="h6">
                {selectedEvent?.id ? 'Edit Event' : 'Add Event'}
              </Typography>
              <TextField
                fullWidth
                label="Title"
                value={selectedEvent?.title || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={selectedEvent?.description || ''}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {selectedEvent?.id && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleEventDelete}
                  >
                    Delete
                  </Button>
                )}
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mr: '5px' }}
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleEventSubmit}
                  >
                    {selectedEvent?.id ? 'Update' : 'Save'}
                  </Button>
                </Box>
              </Box>
            </>
          }
        </Box>
      </Dialog>
    </Box>
  );
}

function renderEventContent({ eventInfo }) {
  return (
    <Box>
      <Typography variant="body2" fontWeight="bold">
        {eventInfo.timeText}
      </Typography>
      <Typography variant="body2" fontStyle="italic">
        {eventInfo.event.title}
      </Typography>
    </Box>
  );
}

function EventDetails({ event, setDialogOpen }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Event Details
      </Typography>
      <Typography variant="subtitle1">
        <b>Title:</b> {event?.title || 'N/A'}
      </Typography>

      <Typography variant="subtitle1">
        <b>Description:</b> {event?.description || 'No description'}
      </Typography>

      <Typography variant="subtitle1">
        <b>Start:</b> {formatDate(event.startAt, { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
      </Typography>

      <Typography variant="subtitle1">
        <b>End:</b> {formatDate(event.endAt, { year: 'numeric', month: 'short', day: 'numeric' }) || 'N/A'}
      </Typography>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => setDialogOpen(false)}
      >
        Close
      </Button>
    </>
  )
}