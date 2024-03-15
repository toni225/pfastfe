import {Box, Modal, Button, Typography} from '@mui/material'

const ReportComponent = ({open, handleClose}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                zIndex: 1000
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Parking History
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
    // return (
    //     <div>{open && 'hello'}</div>
    // )
}

export default ReportComponent
