import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import UpdateEntryForm from './UpdateEntryForm'

function UpdateEntryModal(props) {
  return (
    <Modal className='addmodal'
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='input-form' closeButton>
        Update 
      </Modal.Header>

      <Modal.Body>
        <UpdateEntryForm entry={props.entry} />
      </Modal.Body>
    </Modal>
  );
}

export default function UpdateEntry({ refresh, entry }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="outline-success" 
        onClick={() => {
        setModalShow(true)
      }}>
        Update New Entry
      </Button>

      <UpdateEntryModal
        show={modalShow}
        onHide={() => {
          setModalShow(false)
          refresh()
        }}
        entry={entry}
      />
    </>
  );
}